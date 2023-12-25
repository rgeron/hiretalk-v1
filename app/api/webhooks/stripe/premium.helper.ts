import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/resend";
import { stripe } from "@/lib/stripe";
import { SiteConfig } from "@/site-config";
import { User, UserPlan } from "@prisma/client";
import Stripe from "stripe";
import { z } from "zod";

export const upgradeUserToPlan = async (
  userId: string,
  plan: UserPlan = "PREMIUM"
) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      plan: plan,
    },
  });
};

export const downgradeUserFromPlan = async (userId: string) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      plan: "FREE",
    },
  });
};

export const notifyUserOfPremiumUpgrade = async (user: User) => {
  // TODO : Update premium email
  await sendEmail({
    from: SiteConfig.email.from,
    to: user.email,
    subject: `You are now a premium member of ${SiteConfig.domain}`,
    text: "You are now a premium member of " + SiteConfig.domain,
  });
};

export const notifyUserOfPremiumDowngrade = async (user: User) => {
  // TODO : Update premium email
  await sendEmail({
    from: SiteConfig.email.from,
    to: user.email,
    subject: `You are no longer a premium member of ${SiteConfig.domain}`,
    text: "You are no longer a premium member of " + SiteConfig.domain,
  });
};

export const notifyUserOfPaymentFailure = async (user: User) => {
  // TODO : Update premium email
  await sendEmail({
    from: SiteConfig.email.from,
    to: user.email,
    subject: `Your payment for ${SiteConfig.domain} failed`,
    text: "Your payment for " + SiteConfig.domain + " failed",
  });
};

const PlanSchema = z.nativeEnum(UserPlan);

export const getPlanFromLineItem = async (
  lineItems?: Stripe.LineItem[] | Stripe.InvoiceLineItem[]
): Promise<UserPlan> => {
  const productId = lineItems?.[0]?.price?.product;

  if (!productId) {
    return "PREMIUM";
  }

  const product = await stripe.products.retrieve(productId as string);

  const safePlan = PlanSchema.safeParse(product.metadata?.plan);

  if (safePlan.success) {
    return safePlan.data;
  } else {
    return "PREMIUM";
  }
};
