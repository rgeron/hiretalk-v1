import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export const findUserFromCustomer = async (
  stripeCustomer: string | Stripe.Customer | Stripe.DeletedCustomer | null
) => {
  let stripeCustomerId: string;

  if (typeof stripeCustomer === "string") {
    stripeCustomerId = stripeCustomer;
  } else if (stripeCustomer) {
    stripeCustomerId = stripeCustomer.id;
  } else {
    throw new Error("Invalid customer");
  }

  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        stripeCustomerId,
      },
    });
    return user;
  } catch {}

  const customer = await stripe.customers.retrieve(stripeCustomerId);
  if (customer.deleted) {
    throw new Error("Invalid customer");
  }

  const email = customer.email;
  const name = customer.name ?? undefined;

  if (!email) {
    throw new Error("Invalid customer");
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      stripeCustomerId,
    },
  });

  return user;
};
