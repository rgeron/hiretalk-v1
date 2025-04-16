"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const applyToJobSchema = z.object({
  jobOfferId: z.string(),
  candidateName: z.string().min(2),
  candidateEmail: z.string().email(),
});

type ApplyToJobInput = z.infer<typeof applyToJobSchema>;

export async function applyToJob(input: ApplyToJobInput) {
  try {
    // Validate input
    const validated = applyToJobSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        error: "Invalid input data",
      };
    }

    // Check if the job offer exists
    const jobOffer = await prisma.jobOffer.findUnique({
      where: { id: input.jobOfferId },
    });

    if (!jobOffer) {
      return {
        success: false,
        error: "Job offer not found",
      };
    }

    // Check if the candidate has already applied to this job offer
    const existingApplication = await prisma.candidateApplication.findFirst({
      where: {
        jobOfferId: input.jobOfferId,
        candidateEmail: input.candidateEmail,
      },
    });

    if (existingApplication) {
      return {
        success: false,
        error: "You have already applied to this job offer",
      };
    }

    // Create a new candidate application
    await prisma.candidateApplication.create({
      data: {
        jobOfferId: input.jobOfferId,
        candidateName: input.candidateName,
        candidateEmail: input.candidateEmail,
      },
    });

    return {
      success: true,
      message: "Your application has been submitted successfully",
    };
  } catch (error) {
    console.error("Error applying to job:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}
