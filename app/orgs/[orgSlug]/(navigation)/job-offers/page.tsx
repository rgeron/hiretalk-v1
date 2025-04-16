import { Button } from "@/components/ui/button";
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { hasPermission } from "@/lib/auth/auth-org";
import { combineWithParentMetadata } from "@/lib/metadata";
import type { PageParams } from "@/types/next";
import Link from "next/link";
import { Suspense } from "react";
import { JobOfferCardsLoading } from "./job-offer-loading";
import { JobOffersContent } from "./job-offers-content";

export const generateMetadata = combineWithParentMetadata({
  title: "Job Offers",
  description: "Manage your job offers",
});

export default async function JobOffersPage(
  props: PageParams<{
    orgSlug: string;
  }>,
) {
  const params = await props.params;

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Job Offers</LayoutTitle>
      </LayoutHeader>
      <LayoutActions className="flex gap-2">
        {(await hasPermission({
          organization: ["update"],
        })) && (
          <Button variant="default" asChild>
            <Link href={`/orgs/${params.orgSlug}/job-offers/add-new`}>
              New offer
            </Link>
          </Button>
        )}
      </LayoutActions>
      <LayoutContent className="flex flex-col gap-4 lg:gap-6">
        <Suspense fallback={<JobOfferCardsLoading count={3} />}>
          <JobOffersContent orgSlug={params.orgSlug} />
        </Suspense>
      </LayoutContent>
    </Layout>
  );
}
