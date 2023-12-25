import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { findUserFromCustomer } from "./findUserFromCustomer";
import {
  downgradeUserFromPremium,
  notifyUserOfPaymentFailure,
  notifyUserOfPremiumDowngrade,
  notifyUserOfPremiumUpgrade,
  upgradeUserToPremium,
} from "./premium.helper";

const StripeWebhookSchema = z.object({
  type: z.string(),
  data: z.any(),
});

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const event = StripeWebhookSchema.parse(body);

  switch (event.type) {
    case "checkout.session.completed":
      await onCheckoutSessionCompleted(event.data.object);
      break;

    case "checkout.session.expired":
      await onCheckoutSessionExpired(event.data.object);
      break;

    case "invoice.paid":
      await onInvoicePaid(event.data.object);
      break;

    case "invoice.payment_failed":
      await onInvoicePaymentFailed(event.data.object);
      break;

    case "customer.subscription.deleted":
      await onCustomerSubscriptionDeleted(event.data.object);
      break;

    default:
      return NextResponse.json({
        ok: true,
      });
  }
};

async function onCheckoutSessionCompleted(object: Stripe.Checkout.Session) {
  // The user paid successfully and the subscription is created (if any)
  // ✅ Provision access to your service
  const user = await findUserFromCustomer(object.customer);

  await upgradeUserToPremium(user.id);
  await notifyUserOfPremiumUpgrade(user);
}

async function onCheckoutSessionExpired(object: Stripe.Checkout.Session) {
  // The user didn't complete the transaction
  // 📧 (optional) Send an abandoned cart email
}

async function onInvoicePaid(object: Stripe.Invoice) {
  // A payment was made, usually a recurring payments for a subscription
  // ✅ Provision access to your service
  const user = await findUserFromCustomer(object.customer);

  await upgradeUserToPremium(user.id);
}

async function onInvoicePaymentFailed(object: Stripe.Invoice) {
  // A payment failed, usually a recurring payment for a subscription
  // ❌ Revoke access to your service
  // OR send email to user to pay/update payment method
  // and wait for 'customer.subscription.deleted' event to revoke access

  const user = await findUserFromCustomer(object.customer);

  await downgradeUserFromPremium(user.id);
  await notifyUserOfPaymentFailure(user);
}

async function onCustomerSubscriptionDeleted(object: Stripe.Subscription) {
  // The subscription was canceled
  // ❌ Revoke access to your service

  const user = await findUserFromCustomer(object.customer);
  await downgradeUserFromPremium(user.id);
  await notifyUserOfPremiumDowngrade(user);
}
