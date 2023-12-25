"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/resend";
import { action } from "@/lib/safe-actions";
import { SiteConfig } from "@/site-config";
import { ContactFeedbackSchema } from "./contact-feedback.schema";

export const contactSupportAction = action(
  ContactFeedbackSchema,
  async (data) => {
    const session = await auth();

    const email = session?.user.email ?? data.email;

    const feedback = await prisma.feedback.create({
      data: {
        message: data.message,
        review: Number(data.review) || 0,
        userId: session?.user.id,
        email,
      },
    });

    await sendEmail({
      from: SiteConfig.email.from,
      to: SiteConfig.email.contact,
      subject: `New feedback from ${email}`,
      text: `Review: ${feedback.review}\n\nMessage: ${feedback.message}`,
    });

    return { message: "Your feedback has been sent to support." };
  }
);
