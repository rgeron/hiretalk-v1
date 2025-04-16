import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * This endpoint completes an interview and generates a summary
 */
export async function POST(req: NextRequest) {
  try {
    const { threadId } = await req.json();

    if (!threadId) {
      return NextResponse.json(
        { error: "Thread ID is required" },
        { status: 400 },
      );
    }

    // Find the interview
    const interview = await prisma.interview.findFirst({
      where: {
        threadId: threadId,
        status: "active",
      },
      include: {
        jobOffer: {
          select: {
            name: true,
            description: true,
            organizationId: true,
          },
        },
      },
    });

    if (!interview) {
      return NextResponse.json(
        { error: "Interview not found or already completed" },
        { status: 404 },
      );
    }

    // Get all messages from the thread
    const messages = await openai.beta.threads.messages.list(threadId);

    // Create a structured conversation transcript
    const transcript = messages.data
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      )
      .map((msg) => {
        const role = msg.role === "user" ? "Candidate" : "Interviewer";
        const content = msg.content
          .filter((item) => item.type === "text")
          .map((item) => (item.type === "text" ? item.text.value : ""))
          .join("");
        return `${role}: ${content}`;
      })
      .join("\n\n");

    // Create a run to generate the summary
    const summarizeThread = await openai.beta.threads.create();

    // Add the transcript message asking for a summary
    await openai.beta.threads.messages.create(summarizeThread.id, {
      role: "user",
      content: `Please analyze this interview transcript for the ${interview.jobOffer.name} position and provide:
      1. A structured summary of the candidate's responses regarding their experience, skills, and motivation
      2. An engagement score (1-10) based on the clarity, fluency, and structure of their answers
      3. Key strengths and areas of improvement based on the job requirements
      
      Transcript:
      ${transcript}`,
    });

    // Run the summary generation
    const summarizeRun = await openai.beta.threads.runs.create(
      summarizeThread.id,
      {
        assistant_id: process.env.OPENAI_ASSISTANT_ID || "",
        instructions:
          "Generate a detailed yet concise analysis of this interview transcript. Focus on identifying key skills, relevant experience, and alignment with the job requirements.",
      },
    );

    // Poll until the summary is ready
    let run = await openai.beta.threads.runs.retrieve(
      summarizeThread.id,
      summarizeRun.id,
    );

    while (run.status === "queued" || run.status === "in_progress") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      run = await openai.beta.threads.runs.retrieve(
        summarizeThread.id,
        summarizeRun.id,
      );
    }

    let summary = "";

    if (run.status === "completed") {
      const summaryMessages = await openai.beta.threads.messages.list(
        summarizeThread.id,
        { limit: 1, order: "desc" },
      );

      if (summaryMessages.data[0].role === "assistant") {
        summary = summaryMessages.data[0].content
          .filter((item) => item.type === "text")
          .map((item) => (item.type === "text" ? item.text.value : ""))
          .join("");
      }
    }

    // Update the interview as completed with summary
    await prisma.interview.update({
      where: { id: interview.id },
      data: {
        status: "completed",
        transcript,
        summary,
        completedAt: new Date(),
      },
    });

    // Save the interview result for the recruiter
    await prisma.interviewResult.create({
      data: {
        organizationId: interview.jobOffer.organizationId,
        jobOfferId: interview.jobOfferId,
        candidateName: interview.candidateName,
        candidateEmail: interview.candidateEmail,
        transcript,
        summary,
        status: "pending_review",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Interview completed successfully",
    });
  } catch (error) {
    console.error("Error completing interview:", error);
    return NextResponse.json(
      { error: "Failed to complete interview" },
      { status: 500 },
    );
  }
}
