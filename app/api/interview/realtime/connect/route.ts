import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";

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
    console.log("Request data:", { threadId, candidateName, jobTitle, companyName });

    if (!threadId) {
      return NextResponse.json({ error: "Thread ID is required" }, { status: 400 });
    }

    console.log("Calling OpenAI Realtime API...");
    
    try {
      // Initialize realtime connection with OpenAI
      const realtimeSession = await openai.beta.realtime.connect({
        model: "gpt-4o-realtime-preview", // Realtime model
        audio: {
          input: {
            format: "webm",
            // Enable Voice Activity Detection by default
            turn_detection: {
              mode: "automatic"
            }
          },
          output: {
            voice: "alloy", // Or any other supported voice
            format: "mp3"
          }
        },
        text: {
          enabled: true // Enable text generation alongside audio
        }
      });
      
      console.log("OpenAI Realtime connection successful:", realtimeSession.id);

      // Check if the prisma interview model exists
      if (prisma.interview) {
        try {
          // Store the session information in the database
          await prisma.interview.update({
            where: { threadId },
            data: {
              status: "active",
              realtimeSessionId: realtimeSession.id,
            }
          });
          console.log("Database updated with session ID");
        } catch (dbError) {
          console.warn("Failed to update database with session info:", dbError);
          // Continue anyway as this doesn't prevent the connection
        }
      }

      // Return the SDP offer from OpenAI to the client
      return NextResponse.json({ 
        sdp: realtimeSession.connection.offer.sdp,
        sessionId: realtimeSession.id
      });
    } catch (openaiError) {
      // Log the specific OpenAI error details
      console.error("OpenAI Realtime API error details:", {
        message: openaiError.message,
        type: openaiError.type,
        code: openaiError.code,
        param: openaiError.param,
        stack: openaiError.stack
      });
      throw openaiError; // Re-throw to be caught by the outer catch
    }
  } catch (error) {
    console.error("Error initiating realtime session:", error);
    return NextResponse.json(
      { error: "Failed to initiate realtime session: " + error.message },
      { status: 500 }
    );
  }
} 