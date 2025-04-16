"use server";

import { orgAction } from "@/lib/actions/safe-actions";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Define schema for create template action
const CreateTemplateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().nullable(),
});

// Action to create a new template
export const createTemplateAction = orgAction
  .metadata({
    roles: ["owner", "admin"],
  })
  .schema(CreateTemplateSchema)
  .action(async ({ parsedInput: input, ctx }) => {
    try {
      // Create new template using Prisma
      const newTemplate = await prisma.template.create({
        data: {
          name: input.name,
          description: input.description,
          organizationId: ctx.id,
        },
      });

      return newTemplate;
    } catch (error) {
      console.error("Error creating template:", error);
      throw new Error("Failed to create template. Please try again later.");
    }
  });
