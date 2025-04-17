"use server";

import { orgAction } from "@/lib/actions/safe-actions";
import { prisma } from "@/lib/prisma";
import { UpdateJobOfferSchema } from "./edit-job-offer.schema";

// Action to update a job offer
export const updateJobOfferAction = orgAction
  .metadata({
    roles: ["owner", "admin"],
  })
  .schema(UpdateJobOfferSchema)
  .action(async ({ parsedInput: input, ctx }) => {
    try {
      // Check if job offer exists and belongs to the organization
      const jobOffer = await prisma.jobOffer.findUnique({
        where: {
          id: input.jobOfferId,
          organizationId: ctx.id,
        },
      });

      if (!jobOffer) {
        throw new Error("Job offer not found");
      }

      // Format questions as JSON array with order
      const formattedQuestions = input.questions
        ? input.questions.map((question, index) => ({
            text: question,
            order: index,
          }))
        : [];

      // Use raw query to update the job offer with the JSON field
      await prisma.$executeRaw`
        UPDATE "JobOffer"
        SET 
          name = ${input.name},
          description = ${input.description},
          "interviewType" = ${input.interviewType},
          "durationMin" = ${input.durationMin},
          "durationMax" = ${input.durationMax},
          "interviewerStyle" = ${input.interviewerStyle},
          questions = ${JSON.stringify(formattedQuestions)}::jsonb,
          "updatedAt" = now()
        WHERE id = ${input.jobOfferId}
      `;

      return { success: true };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to update job offer. Please try again later.");
    }
  });
