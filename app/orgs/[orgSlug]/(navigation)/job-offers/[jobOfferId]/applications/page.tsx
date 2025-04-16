import { Button } from "@/components/ui/button";
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

export const generateMetadata = combineWithParentMetadata({
  title: "Job Applications",
  description: "Manage applications for your job offer",
});

export default async function JobOfferApplicationsPage(
  props: PageParams<{
    orgSlug: string;
    jobOfferId: string;
  }>,
) {
  const params = await props.params;

  // Fetch the job offer data to validate and show title
  try {
    const jobOffer = await resolveActionResult(
      getJobOfferByIdAction({ jobOfferId: params.jobOfferId }),
    );

    return (
      <Layout>
        <LayoutHeader>
          <Button variant="outline" size="sm" asChild className="mb-2">
            <Link
              href={`/orgs/${params.orgSlug}/job-offers/${params.jobOfferId}`}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Job Offer
            </Link>
          </Button>
          <LayoutTitle>Applications for: {jobOffer.name}</LayoutTitle>
          <LayoutDescription>
            Manage and review candidate applications
          </LayoutDescription>
        </LayoutHeader>

        <LayoutContent>
          <div className="rounded-lg border p-8 text-center">
            <h2 className="mb-4 text-xl font-semibold">No applications yet</h2>
            <p className="text-muted-foreground mx-auto mb-6 max-w-md">
              When candidates apply for this job offer and complete the AI voice
              interview, their applications will appear here.
            </p>
            <Button asChild>
              <Link
                href={`/orgs/${params.orgSlug}/job-offers/${params.jobOfferId}`}
              >
                Return to Job Offer
              </Link>
            </Button>
          </div>
        </LayoutContent>
      </Layout>
    );
  } catch (error) {
    notFound();
  }
}
