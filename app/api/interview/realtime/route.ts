import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * This endpoint creates a new Realtime session for interviews
 */
export async function POST(req: NextRequest) {
  try {
    const { jobOfferId, candidateName, candidateEmail } = await req.json();

    if (!jobOfferId) {
      return NextResponse.json({ error: "Job offer ID is required" }, { status: 400 });
    }

    // Find the job offer to customize the interview
    const jobOffer = await prisma.jobOffer.findUnique({
      where: { id: jobOfferId },
      include: {
        organization: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!jobOffer) {
      return NextResponse.json({ error: "Job offer not found" }, { status: 404 });
    }

    // Create a Realtime session with OpenAI
    const session = await openai.beta.threads.createAndRun({
      assistant_id: process.env.OPENAI_ASSISTANT_ID || "",
      thread: {
        messages: [
          {
            role: "user",
            content: `Hello, I'm ${candidateName} and I'm applying for the ${jobOffer.name} position at ${jobOffer.organization.name}.`,
          },
        ],
      },
      instructions: `You are conducting an interview for a ${jobOffer.name} position at ${jobOffer.organization.name}. 
      Ask relevant questions about the candidate's experience, skills, and motivation for this role. 
      The job description is: ${jobOffer.description}.
      This interview should take between ${jobOffer.durationMin}-${jobOffer.durationMax} minutes.
      Be conversational and professional. Proceed step by step through different aspects of the job requirements.`,
    });

    // Create a record of this interview in the database
    await prisma.interview.create({
      data: {
        jobOfferId,
        candidateName,
        candidateEmail,
        threadId: session.thread_id,
        runId: session.id,
        status: "active",
      },
    });

    return NextResponse.json({ 
      threadId: session.thread_id,
      runId: session.id
    });
  } catch (error) {
    console.error("Error creating interview session:", error);
    return NextResponse.json(
      { error: "Failed to create interview session" },
      { status: 500 }
    );
  }
} 