"use server";

import { prisma } from "@/lib/prisma";
import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const applyToJobSchema = z.object({
  jobOfferId: z.string(),
  candidateName: z.string().min(2),
  candidateEmail: z.string().email(),
  cvUrl: z.string().optional(),
});

type ApplyToJobInput = z.infer<typeof applyToJobSchema>;

type ApplyToJobResult = {
  success: boolean;
  message?: string;
  error?: string;
  interviewData?: {
    threadId: string;
    runId?: string;
    jobTitle?: string;
    companyName?: string;
    jobDescription?: string;
    durationMin?: number;
    durationMax?: number;
  };
};

export async function applyToJob({
  jobOfferId,
  candidateName,
  candidateEmail,
  cvUrl,
}: {
  jobOfferId: string;
  candidateName: string;
  candidateEmail: string;
  cvUrl?: string;
}): Promise<ApplyToJobResult> {
  try {
    // Validate that the job offer exists and get the details
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
      return {
        success: false,
        error: "Job offer not found.",
      };
    }

    // Create a thread directly with OpenAI
    const thread = await openai.beta.threads.create();

    // Add an initial message from the candidate
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: `Hello, I'm ${candidateName} and I'm applying for the ${jobOffer.name} position at ${jobOffer.organization.name}.`,
    });

    // Create the interview record in the database if the model exists
    if (prisma.interview) {
      try {
        await prisma.interview.create({
          data: {
            jobOfferId,
            candidateName,
            candidateEmail,
            threadId: thread.id,
            status: "active",
            cvUrl,
          },
        });
      } catch (error) {
        console.warn("Failed to create interview record:", error);
        // Continue anyway as this doesn't prevent the WebRTC connection
      }
    }

    return {
      success: true,
      message: "Application successful. Your interview session is ready.",
      interviewData: {
        threadId: thread.id,
        jobTitle: jobOffer.name,
        companyName: jobOffer.organization.name,
        jobDescription: jobOffer.description || "",
        durationMin: jobOffer.durationMin || 15,
        durationMax: jobOffer.durationMax || 20,
      },
    };
  } catch (error) {
    console.error("Error applying to job:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
