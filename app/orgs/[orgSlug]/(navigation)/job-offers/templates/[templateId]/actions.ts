"use server";

import { ActionError, orgAction } from "@/lib/actions/safe-actions";
import { z } from "zod";
import {
  addTemplateQuestion,
  deleteTemplateQuestion,
  updateTemplate,
  updateTemplateQuestion,
} from "../template-service";

// Define zod schemas
const UpdateTemplateSchema = z.object({
  templateId: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().nullable(),
});

const UpdateQuestionSchema = z.object({
  questionId: z.string(),
  question: z.string().min(1, "Question text is required"),
});

const DeleteQuestionSchema = z.object({
  questionId: z.string(),
});

const AddQuestionSchema = z.object({
  templateId: z.string(),
  question: z.string().min(1, "Question text is required"),
});

// Action to update template details
export const updateTemplateAction = orgAction
  .metadata({
    roles: ["owner", "admin"],
  })
  .schema(UpdateTemplateSchema)
  .action(async ({ parsedInput: input }) => {
    try {
      const result = await updateTemplate(input.templateId, {
        name: input.name,
        description: input.description,
      });
      return result;
    } catch {
      throw new ActionError("Failed to update template");
    }
  });

// Action to update a question
export const updateQuestionAction = orgAction
  .metadata({
    roles: ["owner", "admin"],
  })
  .schema(UpdateQuestionSchema)
  .action(async ({ parsedInput: input }) => {
    try {
      const result = await updateTemplateQuestion(input.questionId, {
        question: input.question,
      });
      return result;
    } catch (error) {
      throw new ActionError("Failed to update question");
    }
  });

// Action to delete a question
export const deleteQuestionAction = orgAction
  .metadata({
    roles: ["owner", "admin"],
  })
  .schema(DeleteQuestionSchema)
  .action(async ({ parsedInput: input }) => {
    try {
      const result = await deleteTemplateQuestion(input.questionId);
      return result;
    } catch {
      throw new ActionError("Failed to delete question");
    }
  });

// Action to add a new question
export const addQuestionAction = orgAction
  .metadata({
    roles: ["owner", "admin"],
  })
  .schema(AddQuestionSchema)
  .action(async ({ parsedInput: input }) => {
    try {
      const result = await addTemplateQuestion(input.templateId, {
        question: input.question,
      });
      return result;
    } catch {
      throw new ActionError("Failed to add question");
    }
  });
