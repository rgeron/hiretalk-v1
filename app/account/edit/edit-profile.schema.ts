import { z } from "zod";

export const ProfileFormSchema = z.object({
  name: z.string().optional().nullable(),
  email: z.string(),
});

export type ProfileFormType = z.infer<typeof ProfileFormSchema>;
