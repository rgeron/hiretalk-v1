"use server";

import prisma from "@/lib/prisma";
import { ActionError, action } from "@/lib/server-actions/safe-actions";
import { stripe } from "@/lib/stripe";
import { EmailActionSchema } from "./email.schema";

export const addEmailAction = action(EmailActionSchema, async ({ email }) => {
  try {
    const customer = await stripe.customers.create({
      email: email,
      name: undefined,
    });

    await prisma.user.create({
      data: {
        email,
        stripeCustomerId: customer.id,
      },
    });

    return { email };
  } catch (error) {
    throw new ActionError("The email is already in use");
  }
});
