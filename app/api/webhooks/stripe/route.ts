import { env } from "@/lib/env";
import { logger } from "@/lib/logger";
import { stripe } from "@/lib/stripe";
import { headers } from "next/dist/client/components/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { findUserFromCustomer } from "./findUserFromCustomer";
import {
  downgradeUserFromPlan,
  getPlanFromLineItem,
  notifyUserOfPaymentFailure,
  notifyUserOfPremiumDowngrade,
  notifyUserOfPremiumUpgrade,
  upgradeUserToPlan,
} from "./premium.helper";

export const POST = async (req: NextRequest) => {
  const body = await req.text();
  const headerList = headers();

  logger.debug("Request ");

  const stripeSignature = headerList.get("stripe-signature");

  let event: Stripe.Event | null = null;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      stripeSignature ?? "",
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch {
    logger.debug("Request FAILED - TRY");
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  if (!event) {
    logger.debug("Request FAILED - EVENT");
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

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

  return NextResponse.json({
    ok: true,
  });
};

async function onCheckoutSessionCompleted(object: Stripe.Checkout.Session) {
  // The user paid successfully and the subscription is created (if any)
  // ✅ Provision access to your service
  const user = await findUserFromCustomer(object.customer);

  const lineItems = await stripe.checkout.sessions.listLineItems(object.id, {
    limit: 1,
  });
  logger.debug("Line-items", lineItems);

  await upgradeUserToPlan(user.id, await getPlanFromLineItem(lineItems.data));
  await notifyUserOfPremiumUpgrade(user);
}

async function onCheckoutSessionExpired(object: Stripe.Checkout.Session) {
  // The user didn't complete the transaction
  // 📧 (optional) Send an abandoned cart email
  console.log("Checkout session expired", object);
}

async function onInvoicePaid(object: Stripe.Invoice) {
  // A payment was made, usually a recurring payments for a subscription
  // ✅ Provision access to your service
  const user = await findUserFromCustomer(object.customer);

  await upgradeUserToPlan(
    user.id,
    // TODO :Verify if it's right values
    await getPlanFromLineItem(object.lines?.data)
  );
}

async function onInvoicePaymentFailed(object: Stripe.Invoice) {
  // A payment failed, usually a recurring payment for a subscription
  // ❌ Revoke access to your service
  // OR send email to user to pay/update payment method
  // and wait for 'customer.subscription.deleted' event to revoke access

  const user = await findUserFromCustomer(object.customer);

  await downgradeUserFromPlan(user.id);
  await notifyUserOfPaymentFailure(user);
}

async function onCustomerSubscriptionDeleted(object: Stripe.Subscription) {
  // The subscription was canceled
  // ❌ Revoke access to your service

  const user = await findUserFromCustomer(object.customer);
  await downgradeUserFromPlan(user.id);
  await notifyUserOfPremiumDowngrade(user);
}
