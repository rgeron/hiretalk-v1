"use server";

import { orgAction } from "@/lib/actions/safe-actions";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Schema for job offer actions
const JobOfferActionSchema = z.object({
  jobOfferId: z.string(),
});

// Define type based on Zod schema
export type JobOfferActionSchemaType = z.infer<typeof JobOfferActionSchema>;

// Launch a job offer (change status to "Ongoing")
export const launchJobOfferAction = orgAction
  .schema(JobOfferActionSchema)
  .action(async ({ parsedInput: { jobOfferId }, ctx }) => {
    // Update job offer status
    const jobOffer = await prisma.jobOffer.findUnique({
      where: {
        id: jobOfferId,
        organizationId: ctx.id,
      },
    });

    if (!jobOffer) {
      throw new Error("Job offer not found");
    }

    // Only update if status is "To Be Launched"
    if (jobOffer.status.toLowerCase() !== "to be launched") {
      throw new Error("Job offer is not in 'To Be Launched' status");
    }

    // Update the status
    await prisma.jobOffer.update({
      where: { id: jobOfferId },
      data: {
        status: "Ongoing",
      },
    });

    return { success: true };
  });

// Close a job offer (change status to "Closed")
export const closeJobOfferAction = orgAction
  .schema(JobOfferActionSchema)
  .action(async ({ parsedInput: { jobOfferId }, ctx }) => {
    // Update job offer status
    const jobOffer = await prisma.jobOffer.findUnique({
      where: {
        id: jobOfferId,
        organizationId: ctx.id,
      },
    });

    if (!jobOffer) {
      throw new Error("Job offer not found");
    }

    // Only update if status is "Ongoing"
    if (jobOffer.status.toLowerCase() !== "ongoing") {
      throw new Error("Job offer is not in 'Ongoing' status");
    }

    // Update the status
    await prisma.jobOffer.update({
      where: { id: jobOfferId },
      data: {
        status: "Closed",
      },
    });

    return { success: true };
  });

// Delete a job offer
export const deleteJobOfferAction = orgAction
  .schema(JobOfferActionSchema)
  .action(async ({ parsedInput: { jobOfferId }, ctx }) => {
    // Check if job offer exists and belongs to the organization
    const jobOffer = await prisma.jobOffer.findUnique({
      where: {
        id: jobOfferId,
        organizationId: ctx.id,
      },
    });

    if (!jobOffer) {
      throw new Error("Job offer not found");
    }

    // Only delete if status is "Closed"
    if (jobOffer.status.toLowerCase() !== "closed") {
      throw new Error("Job offer must be closed before deletion");
    }

    // Delete the job offer
    await prisma.jobOffer.delete({
      where: { id: jobOfferId },
    });

    return { success: true, redirect: true };
  });
