"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const applyToJobSchema = z.object({
  jobOfferId: z.string(),
  candidateName: z.string().min(2),
  candidateEmail: z.string().email(),
});

type ApplyToJobInput = z.infer<typeof applyToJobSchema>;

type ApplyToJobResult = {
  success: boolean;
  message?: string;
  error?: string;
  interviewData?: {
    threadId: string;
    runId: string;
  };
};

export async function applyToJob({
  jobOfferId,
  candidateName,
  candidateEmail,
}: {
  jobOfferId: string;
  candidateName: string;
  candidateEmail: string;
}): Promise<ApplyToJobResult> {
  try {
    // Validate that the job offer exists
    const jobOffer = await prisma.jobOffer.findUnique({
      where: { id: jobOfferId },
    });

    if (!jobOffer) {
      return {
        success: false,
        error: "Job offer not found.",
      };
    }

    // Start the OpenAI interview
    const response = await fetch(
      `${process.env.BETTER_AUTH_URL}/api/interview/realtime`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobOfferId,
          candidateName,
          candidateEmail,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error ?? "Failed to start interview session.",
      };
    }

    const interviewData = await response.json();

    return {
      success: true,
      message: "Application successful. Your interview session is ready.",
      interviewData: {
        threadId: interviewData.threadId,
        runId: interviewData.runId,
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
