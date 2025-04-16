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
import { JobOffersFilters } from "./job-offers-filters";

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
  const searchParams = await props.searchParams;

  // Get search and filter parameters from the URL
  const search = searchParams.search as string | undefined;
  const status = searchParams.status as string | undefined;

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Job Offers</LayoutTitle>
      </LayoutHeader>
      <LayoutActions className="flex flex-col items-center gap-3 sm:flex-row">
        <div className="w-full sm:flex-1">
          <JobOffersFilters />
        </div>
        {(await hasPermission({
          organization: ["update"],
        })) && (
          <Button variant="default" asChild className="w-full sm:w-auto">
            <Link href={`/orgs/${params.orgSlug}/job-offers/add-new`}>
              New offer
            </Link>
          </Button>
        )}
      </LayoutActions>
      <LayoutContent className="flex flex-col gap-4 lg:gap-6">
        <Suspense fallback={<JobOfferCardsLoading count={3} />}>
          <JobOffersContent
            orgSlug={params.orgSlug}
            search={search}
            status={status}
          />
        </Suspense>
      </LayoutContent>
    </Layout>
  );
}
