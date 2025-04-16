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
