import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * This endpoint handles sending messages to an existing Realtime session
 */
export async function POST(req: NextRequest) {
  try {
    const { threadId, message } = await req.json();

    if (!threadId || !message) {
      return NextResponse.json(
        { error: "Thread ID and message are required" },
        { status: 400 },
      );
    }

    // Find the interview to verify it exists and is active
    const interview = await prisma.interview.findFirst({
      where: {
        threadId: threadId,
        status: "active",
      },
    });

    if (!interview) {
      return NextResponse.json(
        { error: "Interview session not found or inactive" },
        { status: 404 },
      );
    }

    // Add the user message to the thread
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    });

    // Create a new run to get the assistant's response
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID || "",
    });

    // Update the interview with the latest run ID
    await prisma.interview.update({
      where: { id: interview.id },
      data: { runId: run.id },
    });

    return NextResponse.json({ runId: run.id });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
