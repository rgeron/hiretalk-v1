import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Pricing } from "@/features/plans/PricingSection";
import { formatDate } from "@/lib/format/date";
import { getRequiredCurrentOrganizationCache } from "@/lib/react/cache";
import { getServerUrl } from "@/lib/server-url";
import { stripe } from "@/lib/stripe";
import type { PageParams } from "@/types/next";
import Link from "next/link";

export default async function RoutePage(props: PageParams<{}>) {
  const { organization } = await getRequiredCurrentOrganizationCache(["ADMIN"]);

  if (!organization.stripeCustomerId) {
    throw new Error("Organization has no Stripe customer");
  }

  if (organization.plan.name === "FREE") {
    return (
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Free plan</CardTitle>
            <CardDescription>
              Upgrade to premium to unlock all features.
            </CardDescription>
          </CardHeader>
        </Card>
        <Pricing />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <PremiumCard />
    </div>
  );
}

const PremiumCard = async () => {
  const { organization } = await getRequiredCurrentOrganizationCache(["ADMIN"]);
  console.log({ organization });

  if (!organization.stripeCustomerId) {
    throw new Error("Organization has no Stripe customer");
  }

  const stripeCustomer = await stripe.customers.retrieve(
    organization.stripeCustomerId,
  );
  const subscriptions = await stripe.subscriptions.list({
    customer: stripeCustomer.id,
  });
  const firstSubscription = subscriptions.data[0];
  const nextRenewDate = firstSubscription.current_period_end;
  const price = firstSubscription.items.data[0].price;

  const customerPortal = await stripe.billingPortal.sessions.create({
    customer: stripeCustomer.id,
    return_url: `${getServerUrl()}/${organization.id}/settings/billing`,
  });

  return (
    <Card>
      <CardHeader>
        <CardDescription>Plan</CardDescription>
        <CardTitle>
          {organization.plan.name}{" "}
          {firstSubscription.cancel_at ? "(Canceled)" : ""}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Typography variant="muted">Price</Typography>
        <Typography variant="large">
          ${(price.unit_amount ?? 0) / 100}
        </Typography>
        <Typography variant="muted">Renew date</Typography>
        <Typography variant="large">
          {formatDate(new Date(nextRenewDate * 1000))}
        </Typography>
      </CardContent>
      <CardFooter>
        <Link className={buttonVariants()} href={customerPortal.url}>
          Manage subscriptions and invoices
        </Link>
      </CardFooter>
    </Card>
  );
};
