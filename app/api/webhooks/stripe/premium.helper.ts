import { logger } from "@/lib/logger";
import { sendEmail } from "@/lib/mail/sendEmail";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import SubscriptionDowngradeEmail from "@email/SubscriptionDowngradeEmail.email";
import SubscriptionFailedEmail from "@email/SubscriptionFailedEmail.email";
import SuccessUpgradeEmail from "@email/SuccessUpgradeEmail.email";
import type { Organization } from "@prisma/client";
import type Stripe from "stripe";

export const upgradeUserToPlan = async (
  organizationId: string,
  plan: string,
) => {
  logger.debug("Upgrade user to plan", organizationId, plan);
  await prisma.organization.update({
    where: {
      id: organizationId,
    },
    data: {
      planId: plan,
    },
  });
};

export const downgradeUserFromPlan = async (organizationId: string) => {
  await prisma.organization.update({
    where: {
      id: organizationId,
    },
    data: {
      planId: "FREE",
    },
  });
};

export const notifyUserOfPremiumUpgrade = async (user: Organization) => {
  await sendEmail({
    to: user.email,
    subject: `Success! You've Unlocked Full Access to Our Features`,
    react: SuccessUpgradeEmail(),
  });
};

export const notifyUserOfPremiumDowngrade = async (user: Organization) => {
  await sendEmail({
    to: user.email,
    subject: `Important Update: Changes to Your Account Status`,
    react: SubscriptionDowngradeEmail(),
  });
};

export const notifyUserOfPaymentFailure = async (user: Organization) => {
  await sendEmail({
    to: user.email,
    subject: `Action Needed: Update Your Payment to Continue Enjoying Our Services`,
    react: SubscriptionFailedEmail(),
  });
};

/**
 * This method return a valid plan id from the line items.
 *
 * ! You must add a plan_id to the product metadata.
 * Please follow the documentation.
 * @param lineItems Any line items from Stripe
 * @returns A valid plan id
 */
export const getPlanFromLineItem = async (
  lineItems?:
    | Stripe.LineItem[]
    | Stripe.InvoiceLineItem[]
    | Stripe.SubscriptionItem[],
): Promise<string> => {
  if (!lineItems) {
    return "FREE";
  }

  const productId = lineItems[0].price?.product;

  if (!productId) {
    return "FREE";
  }

  const product = await stripe.products.retrieve(productId as string);

  const planId = product.metadata.plan_id;

  if (!planId) {
    throw new Error(
      "Invalid plan : you must add a plan_id to the product metadata.",
    );
  }

  const plan = await prisma.organizationPlan.findFirst({
    where: {
      id: planId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!plan) {
    throw new Error(
      `Invalid plan : you add the plan_id ${planId} to the product but this plan doesn't exist.`,
    );
  }

  return plan.id;
};
