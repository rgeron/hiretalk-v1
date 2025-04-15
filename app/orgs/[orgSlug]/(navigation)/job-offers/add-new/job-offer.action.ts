"use server";

import { orgAction } from "@/lib/actions/safe-actions";
import { prisma } from "@/lib/prisma";
import { CreateJobOfferSchema } from "./job-offer.schema";

// Define some return types for SQL queries
type JobOfferResult = { id: string };
type TemplateResult = { id: string };

export const createJobOfferAction = orgAction
  .metadata({
    roles: ["owner", "admin"],
  })
  .schema(CreateJobOfferSchema)
  .action(async ({ parsedInput: input, ctx }) => {
    try {
      // We'll use a simpler approach with direct SQL
      const result = await prisma.$queryRaw<JobOfferResult[]>`
        INSERT INTO "JobOffer" (
          id, 
          name, 
          description, 
          "interviewType", 
          "durationMin", 
          "durationMax", 
          "interviewerStyle", 
          status, 
          "organizationId", 
          "createdAt", 
          "updatedAt"
        ) 
        VALUES (
          gen_random_uuid(), 
          ${input.name}, 
          ${input.description}, 
          ${input.interviewType}, 
          ${input.durationMin}, 
          ${input.durationMax}, 
          ${input.interviewerStyle}, 
          'to be launched', 
          ${ctx.id}, 
          now(), 
          now()
        )
        RETURNING id;
      `;

      const newJobOffer = result[0];

      // Create a template if questions are provided
      if (input.questions && input.questions.length > 0) {
        // Create the template
        const templateResult = await prisma.$queryRaw<TemplateResult[]>`
          INSERT INTO "Template" (
            id,
            name,
            description,
            "organizationId",
            "createdAt",
            "updatedAt"
          )
          VALUES (
            gen_random_uuid(),
            ${`Template for ${input.name}`},
            ${`Auto-generated template for job offer: ${input.name}`},
            ${ctx.id},
            now(),
            now()
          )
          RETURNING id;
        `;

        const template = templateResult[0];

        // Add the template ID to the job offer
        if (template.id) {
          await prisma.$executeRaw`
            UPDATE "JobOffer"
            SET "templateId" = ${template.id}
            WHERE id = ${newJobOffer.id};
          `;

          // Add questions to the template
          // Instead of a loop, use Promise.all for better performance
          await Promise.all(
            input.questions.map(
              async (question, index) =>
                prisma.$executeRaw`
                INSERT INTO "TemplateQuestion" (
                  id,
                  "templateId",
                  question,
                  category,
                  "order",
                  "createdAt",
                  "updatedAt"
                )
                VALUES (
                  gen_random_uuid(),
                  ${template.id},
                  ${question},
                  'custom',
                  ${index},
                  now(),
                  now()
                );
              `,
            ),
          );
        }
      }

      return {
        success: true,
        message: "Job offer created successfully",
        jobOfferId: newJobOffer.id,
      };
    } catch (error) {
      console.error("Error creating job offer:", error);
      throw new Error("Failed to create job offer. Please try again later.");
    }
  });
