import { Button } from "@/components/ui/button";
import {
  Layout,
  LayoutContent,
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
import { EditJobOfferForm } from "./edit-job-offer-form";

export const generateMetadata = combineWithParentMetadata({
  title: "Edit Job Offer",
  description: "Modify your job offer details and questions",
});

export default async function EditJobOfferPage(
  props: PageParams<{
    orgSlug: string;
    jobOfferId: string;
  }>,
) {
  const params = await props.params;

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
          <LayoutTitle>Edit Job Offer</LayoutTitle>
        </LayoutHeader>

        <LayoutContent>
          <EditJobOfferForm jobOffer={jobOffer} orgSlug={params.orgSlug} />
        </LayoutContent>
      </Layout>
    );
  } catch {
    notFound();
  }
}
