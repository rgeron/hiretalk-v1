"use server";

import { orgAction } from "@/lib/actions/safe-actions";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Action to fetch all job offers for the organization
export const getJobOffersAction = orgAction
  .schema(z.object({})) // No input needed for fetching all job offers
  .action(async ({ ctx }) => {
    try {
      // Get job offers for the current organization
      const jobOffers = await prisma.jobOffer.findMany({
        where: {
          organizationId: ctx.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      // Get application counts for each job offer - using dynamic access to the Interview model
      // @ts-expect-error - Interview model exists at runtime but not in TypeScript types
      const applicationCounts = await prisma.Interview.groupBy({
        by: ["jobOfferId"],
        _count: {
          id: true,
        },
        where: {
          jobOffer: {
            organizationId: ctx.id,
          },
        },
      });

      // Map the counts to each job offer
      const jobOffersWithCounts = jobOffers.map((offer) => {
        const countRecord = applicationCounts.find(
          (count: { jobOfferId: string; _count: { id: number } }) =>
            count.jobOfferId === offer.id,
        );

        return {
          ...offer,
          applicationCount: countRecord?._count.id ?? 0,
        };
      });

      return jobOffersWithCounts;
    } catch {
      throw new Error("Failed to fetch job offers. Please try again later.");
    }
  });

// Action to get a single job offer by ID
export const getJobOfferByIdAction = orgAction
  .schema(
    z.object({
      jobOfferId: z.string(),
    }),
  )
  .action(async ({ parsedInput: { jobOfferId }, ctx }) => {
    try {
      // Get the specific job offer by ID for the current organization
      const jobOffer = await prisma.jobOffer.findFirst({
        where: {
          id: jobOfferId,
          organizationId: ctx.id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          interviewType: true,
          durationMin: true,
          durationMax: true,
          interviewerStyle: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          organizationId: true,
          templateId: true,
        },
      });

      if (!jobOffer) {
        throw new Error("Job offer not found");
      }

      // Get application count for this job offer - using dynamic access to the Interview model
      // @ts-expect-error - Interview model exists at runtime but not in TypeScript types
      const applicationCount = await prisma.Interview.count({
        where: {
          jobOfferId: jobOffer.id,
        },
      });

      // Try to get questions using a raw query
      let questions = null;
      try {
        const result = await prisma.$queryRaw`
          SELECT questions FROM "JobOffer" WHERE id = ${jobOfferId}
        `;
        if (result && Array.isArray(result) && result.length > 0) {
          questions = result[0].questions;
        }
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }

      // Return job offer with application count
      return {
        ...jobOffer,
        applicationCount,
        questions,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to fetch job offer. Please try again later.");
    }
  });
