import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * This endpoint completes the WebRTC handshake by sending the client's answer to OpenAI
 */
export async function POST(req: NextRequest) {
  try {
    console.log("Processing WebRTC answer...");
    const { threadId, sdp } = await req.json();
    console.log("Request data received:", {
      threadId,
      sdpLength: sdp?.length || 0,
    });

    if (!threadId || !sdp) {
      return NextResponse.json(
        { error: "Thread ID and SDP are required" },
        { status: 400 },
      );
    }

    let realtimeSessionId = null;

    // Check if the prisma interview model exists
    if (prisma.interview) {
      try {
        console.log("Looking up interview in database...");
        // Retrieve the session ID from the database
        const interview = await prisma.interview.findUnique({
          where: { threadId },
          select: { realtimeSessionId: true },
        });

        if (interview?.realtimeSessionId) {
          realtimeSessionId = interview.realtimeSessionId;
          console.log("Found session ID in database:", realtimeSessionId);
        }
      } catch (error) {
        console.warn("Error retrieving interview from database:", error);
        // Continue anyway, but return an error if we can't find the session ID
      }
    }

    if (!realtimeSessionId) {
      return NextResponse.json(
        { error: "Realtime session not found" },
        { status: 404 },
      );
    }

    try {
      console.log("Completing WebRTC connection with OpenAI...");
      // Send the answer to OpenAI to complete the WebRTC handshake
      // @ts-ignore - OpenAI Realtime API might be too new for TypeScript definitions
      await openai.beta.realtime.complete_connection(realtimeSessionId, {
        answer: {
          sdp,
          type: "answer",
        },
      });
      console.log("WebRTC connection completed successfully!");
    } catch (openaiError) {
      // Log the specific OpenAI error details
      console.error("OpenAI complete_connection error details:", {
        message: openaiError.message,
        type: openaiError.type,
        code: openaiError.code,
        param: openaiError.param,
        stack: openaiError.stack,
      });
      throw openaiError; // Re-throw to be caught by the outer catch
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error completing WebRTC connection:", error);
    return NextResponse.json(
      { error: "Failed to complete WebRTC connection: " + error.message },
      { status: 500 },
    );
  }
}
