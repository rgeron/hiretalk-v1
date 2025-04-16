import { z } from "zod";

// Schema for fetching job offers
export const JobOfferSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  interviewType: z.string(),
  durationMin: z.number(),
  durationMax: z.number(),
  interviewerStyle: z.string(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  organizationId: z.string(),
  applicationCount: z.number().optional(),
});

export type JobOfferSchemaType = z.infer<typeof JobOfferSchema>;
