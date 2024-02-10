import { logger } from "@/lib/logger";
import { sendEmail } from "@/lib/mail/sendEmail";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import SubscribtionDowngradeEmail from "@email/SubscriptionDowngradeEmail";
import SubscribtionFailedEmail from "@email/SubscriptionFailedEmail";
import SuccessUpgradeEmail from "@email/SuccessUpgradeEmail";
import type { User } from "@prisma/client";
import { UserPlan } from "@prisma/client";
import type Stripe from "stripe";
import { z } from "zod";

export const upgradeUserToPlan = async (
  userId: string,
  plan: UserPlan = "PREMIUM"
) => {
  logger.debug("UPDATE USER", userId, plan);
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
  await sendEmail({
    to: user.email,
    subject: `Success! You've Unlocked Full Access to Our Features`,
    react: SuccessUpgradeEmail(),
  });
};

export const notifyUserOfPremiumDowngrade = async (user: User) => {
  await sendEmail({
    to: user.email,
    subject: `Important Update: Changes to Your Account Status`,
    react: SubscribtionDowngradeEmail(),
  });
};

export const notifyUserOfPaymentFailure = async (user: User) => {
  await sendEmail({
    to: user.email,
    subject: `Action Needed: Update Your Payment to Continue Enjoying Our Services`,
    react: SubscribtionFailedEmail(),
  });
};

const PlanSchema = z.nativeEnum(UserPlan);

export const getPlanFromLineItem = async (
  lineItems?:
    | Stripe.LineItem[]
    | Stripe.InvoiceLineItem[]
    | Stripe.SubscriptionItem[]
): Promise<UserPlan> => {
  if (!lineItems) {
    return "PREMIUM";
  }

  const productId = lineItems[0].price?.product;

  logger.debug("Product ID", productId);

  if (!productId) {
    return "PREMIUM";
  }

  const product = await stripe.products.retrieve(productId as string);

  const safePlan = PlanSchema.safeParse(product.metadata.plan);

  if (safePlan.success) {
    logger.debug("Product ID", { safePlan });
    return safePlan.data;
  } else {
    return "PREMIUM";
  }
};
