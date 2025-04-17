import { z } from "zod";

// Schema for updating job offers
export const UpdateJobOfferSchema = z.object({
  jobOfferId: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  durationMin: z.coerce.number().min(1, "Minimum duration is required"),
  durationMax: z.coerce.number().min(1, "Maximum duration is required"),
  interviewType: z.string().min(1, "Interview type is required"),
  interviewerStyle: z.string().min(1, "Interviewer style is required"),
  questions: z.array(z.string()).optional(),
});

// Extract type based on Zod schema
export type UpdateJobOfferSchemaType = z.infer<typeof UpdateJobOfferSchema>;
