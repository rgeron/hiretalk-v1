"use server";

import { orgAction } from "@/lib/actions/safe-actions";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const getInterviewsForJobAction = orgAction
  .schema(
    z.object({
      jobOfferId: z.string(),
    }),
  )
  .action(async ({ parsedInput: { jobOfferId }, ctx }) => {
    try {
      // Get the job offer to verify it belongs to the organization
      const jobOffer = await prisma.jobOffer.findFirst({
        where: {
          id: jobOfferId,
          organizationId: ctx.id,
        },
      });

      if (!jobOffer) {
        throw new Error("Job offer not found");
      }

      // Get all interviews for this job offer
      // @ts-expect-error - Interview model exists at runtime but not in TypeScript types
      const interviews = await prisma.Interview.findMany({
        where: {
          jobOfferId,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          candidateName: true,
          candidateEmail: true,
          cvUrl: true,
          recordingUrl: true,
          status: true,
          createdAt: true,
          completedAt: true,
          overallScore: true,
          recommendation: true,
          isReviewed: true,
        },
      });

      return interviews;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to fetch interviews. Please try again later.");
    }
  });
