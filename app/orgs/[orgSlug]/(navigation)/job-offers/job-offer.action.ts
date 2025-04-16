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

      // Get application counts for each job offer
      const applicationCounts = await prisma.candidateApplication.groupBy({
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
          (count) => count.jobOfferId === offer.id,
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
      });

      if (!jobOffer) {
        throw new Error("Job offer not found");
      }

      // Get application count for this job offer
      const applicationCount = await prisma.candidateApplication.count({
        where: {
          jobOfferId: jobOffer.id,
        },
      });

      // Return job offer with application count
      return {
        ...jobOffer,
        applicationCount,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to fetch job offer. Please try again later.");
    }
  });
