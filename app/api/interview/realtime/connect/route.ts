import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * This endpoint initiates a WebRTC connection with OpenAI's Realtime API
 */
export async function POST(req: NextRequest) {
  try {
    console.log("Starting realtime WebRTC connection...");
    const { threadId, candidateName, jobTitle, companyName } = await req.json();
    console.log("Request data:", {
      threadId,
      candidateName,
      jobTitle,
      companyName,
    });

    if (!threadId) {
      return NextResponse.json(
        { error: "Thread ID is required" },
        { status: 400 },
      );
    }

    console.log("Calling OpenAI Realtime API...");

    try {
      // First, create a Realtime session using the sessions endpoint
      const sessionResponse = await fetch(
        "https://api.openai.com/v1/realtime/sessions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o-realtime-preview-2024-12-17",
            voice: "alloy",
          }),
        },
      );

      if (!sessionResponse.ok) {
        const errorData = await sessionResponse.json();
        console.error("Error creating realtime session:", errorData);
        throw new Error(
          `Failed to create realtime session: ${sessionResponse.status} ${JSON.stringify(errorData)}`,
        );
      }

      const sessionData = await sessionResponse.json();
      console.log("Session created successfully:", sessionData);

      // Get the ephemeral key from the session
      const ephemeralKey = sessionData.client_secret.value;

      // Store the session details in the database
      const realtimeSessionId = sessionData.id;

      // Update the interview record if it exists
      if (prisma.interview) {
        try {
          await prisma.interview.update({
            where: { threadId },
            data: {
              status: "active",
              realtimeSessionId,
            },
          });
          console.log("Database updated with session ID");
        } catch (dbError) {
          console.warn("Failed to update database with session info:", dbError);
          // Continue anyway as this doesn't prevent the connection
        }
      }

      // Return the ephemeral key to the client
      return NextResponse.json({
        ephemeralKey,
        sessionId: realtimeSessionId,
      });
    } catch (openaiError) {
      // Log the specific OpenAI error details
      console.error("OpenAI Realtime API error details:", {
        message: openaiError.message,
        type: openaiError.type,
        code: openaiError.code,
        param: openaiError.param,
        stack: openaiError.stack,
      });
      throw openaiError; // Re-throw to be caught by the outer catch
    }
  } catch (error) {
    console.error("Error initiating realtime session:", error);
    return NextResponse.json(
      { error: `Failed to initiate realtime session: ${error.message}` },
      { status: 500 },
    );
  }
}
