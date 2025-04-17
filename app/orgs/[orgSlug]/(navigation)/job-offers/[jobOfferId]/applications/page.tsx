import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { resolveActionResult } from "@/lib/actions/actions-utils";
import { combineWithParentMetadata } from "@/lib/metadata";
import type { PageParams } from "@/types/next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJobOfferByIdAction } from "../../job-offer.action";
import { JobOfferTabs } from "../job-offer-tabs";
import { CopyLinkButton } from "./copy-link-button";

export const generateMetadata = combineWithParentMetadata({
  title: "Job Applications",
  description: "View and manage applications for this job offer",
});

export default async function JobOfferApplicationsPage(
  props: PageParams<{
    orgSlug: string;
    jobOfferId: string;
  }>,
) {
  const params = await props.params;

  // Fetch the job offer data
  try {
    const jobOffer = await resolveActionResult(
      getJobOfferByIdAction({ jobOfferId: params.jobOfferId }),
    );

    return (
      <Layout>
        <LayoutHeader>
          <Button variant="outline" size="sm" asChild className="mb-2">
            <Link href={`/orgs/${params.orgSlug}/job-offers`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Job Offers
            </Link>
          </Button>
          <LayoutTitle>{jobOffer.name}</LayoutTitle>
          <LayoutDescription>
            Manage applications and interviews for this job offer
          </LayoutDescription>
        </LayoutHeader>

        <LayoutContent className="flex flex-col gap-6">
          <JobOfferTabs
            orgSlug={params.orgSlug}
            jobOfferId={jobOffer.id}
            activeTab="applications"
          />

          <Card>
            <CardHeader>
              <CardTitle>Applications</CardTitle>
            </CardHeader>
            <CardContent>
              {jobOffer.applicationCount > 0 ? (
                <p>Displaying application list would go here</p>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <h3 className="text-lg font-medium">No applications yet</h3>
                  <p className="text-muted-foreground mt-1 max-w-md">
                    Share your job offer link with candidates to start receiving
                    applications.
                  </p>
                  <CopyLinkButton jobOfferId={jobOffer.id} />
                </div>
              )}
            </CardContent>
          </Card>
        </LayoutContent>
      </Layout>
    );
  } catch {
    notFound();
  }
}
