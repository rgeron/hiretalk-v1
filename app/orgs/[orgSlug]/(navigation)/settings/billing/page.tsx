import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pricing } from "@/features/plans/pricing-section";
import { auth } from "@/lib/auth";
import { combineWithParentMetadata } from "@/lib/metadata";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import { headers } from "next/headers";
import { OrgBilling } from "./org-billing";

export const generateMetadata = combineWithParentMetadata({
  title: "Billing",
  description: "Manage your organization billing.",
});

export default async function OrgBillingPage() {
  const org = await getRequiredCurrentOrgCache({
    permissions: {
      subscription: ["manage"],
    },
  });

  const subscriptions = await auth.api.listActiveSubscriptions({
    headers: await headers(),
    query: {
      referenceId: org.id,
    },
  });

  if (!subscriptions[0]) {
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
    <OrgBilling
      orgId={org.id}
      orgSlug={org.slug}
      subscription={subscriptions[0]}
    />
  );
}
