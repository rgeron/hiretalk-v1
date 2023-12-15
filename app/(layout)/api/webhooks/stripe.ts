import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { z } from 'zod';

const StripeWebhookSchema = z.object({
  type: z.string(),
  data: z.any(),
});

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const event = StripeWebhookSchema.parse(body);

  if (event.type === 'checkout.session.completed') {
    const object = event.data.object as Stripe.Checkout.Session;
    // The user paid successfully and the subscription is created (if any)
    // ✅ Provision access to your service
    return;
  }

  if (event.type === 'checkout.session.expired') {
    const object = event.data.object as Stripe.Checkout.Session;
    // The user didn't complete the transaction
    // 📧 (optional) Send an abandoned cart email
    return;
  }

  if (event.type === 'invoice.paid') {
    const object = event.data.object as Stripe.Invoice;
    // A payment was made, usually a recurring payments for a subscription
    // ✅ Provision access to your service
    return;
  }

  if (event.type === 'invoice.payment_failed') {
    const object = event.data.object as Stripe.Invoice;
    // A payment failed, usually a recurring payment for a subscription
    // ❌ Revoke access to your service
    // OR send email to user to pay/update payment method
    // and wait for 'customer.subscription.deleted' event to revoke access
    return;
  }

  if (event.type === 'customer.subscription.deleted') {
    const object = event.data.object as Stripe.Subscription;
    // The subscription was canceled
    // ❌ Revoke access to your service
    return;
  }

  return NextResponse.json({
    ok: true,
  });
};
