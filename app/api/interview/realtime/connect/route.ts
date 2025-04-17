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

    // Find the interview and associated job offer
    const interview = await prisma.interview.findFirst({
      where: { threadId },
      include: {
        jobOffer: true,
      },
    });

    if (!interview || !interview.jobOffer) {
      console.warn("Interview or job offer not found for threadId:", threadId);
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
            // Add custom instructions to have AI speak first
            instructions: generateInstructions(
              candidateName,
              jobTitle,
              companyName,
              interview?.jobOffer,
            ),
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
          // First find the interview by threadId
          const interview = await prisma.interview.findFirst({
            where: { threadId },
          });

          if (interview) {
            // Then update using the id
            await prisma.interview.update({
              where: { id: interview.id },
              data: {
                status: "active",
                realtimeSessionId,
                startedAt: new Date(), // Record when the interview starts
              },
            });
            console.log("Database updated with session ID");
          } else {
            console.warn(`No interview found with threadId: ${threadId}`);
          }
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
    } catch (openaiError: unknown) {
      // Log the specific OpenAI error details
      const error = openaiError as Error;
      console.error("OpenAI Realtime API error details:", {
        message: error.message,
        stack: error.stack,
      });
      throw openaiError; // Re-throw to be caught by the outer catch
    }
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error initiating realtime session:", err);
    return NextResponse.json(
      { error: `Failed to initiate realtime session: ${err.message}` },
      { status: 500 },
    );
  }
}

/**
 * Generate custom instructions for the AI interviewer
 */
function generateInstructions(
  candidateName: string,
  jobTitle: string,
  companyName: string,
  jobOffer?: any,
) {
  // Get job questions if available
  let questionsText = "";
  let timeoutInstructions = "";

  if (jobOffer) {
    // Format questions if they exist
    if (jobOffer.questions) {
      const questions =
        typeof jobOffer.questions === "string"
          ? JSON.parse(jobOffer.questions)
          : jobOffer.questions;

      if (Array.isArray(questions)) {
        questionsText =
          "You must ask the following questions in this exact order:\n";
        questions.forEach((q: any, index: number) => {
          const questionText = typeof q === "string" ? q : q.text || q.question;
          questionsText += `${index + 1}. ${questionText}\n`;
        });
      }
    }

    // Add timeout instructions
    const durationMax = jobOffer.durationMax || 20;
    timeoutInstructions = `This interview must be completed within ${durationMax} minutes. After ${durationMax} minutes, you must wrap up the interview by saying "Thank you for your time, our interview is now complete."`;
  }

  return `You are conducting an interview for a ${jobTitle} position at ${companyName}.
  
You must ALWAYS introduce yourself first at the beginning of the conversation. Start by saying: "Hello ${candidateName}, I'm the AI interviewer for ${companyName}. Thank you for applying to the ${jobTitle} position. I'll be asking you some questions about your experience and skills."

${questionsText}

Be conversational, engaging, and professional. Listen carefully to the candidate's responses and ask follow-up questions when appropriate.

${timeoutInstructions}

After all questions have been asked, conclude by thanking the candidate for their time and informing them that the interview is complete.`;
}
