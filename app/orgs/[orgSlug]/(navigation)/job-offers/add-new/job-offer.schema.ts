import { z } from "zod";

// Follow the project's Zod schema naming convention
export const CreateJobOfferSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  durationMin: z.coerce.number().min(1, "Minimum duration is required"),
  durationMax: z.coerce.number().min(1, "Maximum duration is required"),
  interviewType: z.string().min(1, "Interview type is required"),
  interviewerStyle: z.string().min(1, "Interviewer style is required"),
  templateId: z.string().optional(),
  questions: z.array(z.string()).optional(),
});

// Export the type for use in the form
export type CreateJobOfferSchemaType = z.infer<typeof CreateJobOfferSchema>;
