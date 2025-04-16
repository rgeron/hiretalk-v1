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
import { ArrowLeft, BarChart3, Clock, Users } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJobOfferByIdAction } from "../../job-offer.action";
import { JobOfferTabs } from "../job-offer-tabs";

export const generateMetadata = combineWithParentMetadata({
  title: "Job Offer Data",
  description: "Analytics and insights for your job offer",
});

export default async function JobOfferDataPage(
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
            Analytics and insights for your job offer
          </LayoutDescription>
        </LayoutHeader>

        <LayoutContent className="flex flex-col gap-6">
          <JobOfferTabs
            orgSlug={params.orgSlug}
            jobOfferId={jobOffer.id}
            activeTab="data"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Users className="text-muted-foreground h-5 w-5" />
                  <div className="text-2xl font-bold">
                    {jobOffer.applicationCount}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Duration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Clock className="text-muted-foreground h-5 w-5" />
                  <div className="text-2xl font-bold">
                    {jobOffer.durationMin} min
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Completion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <BarChart3 className="text-muted-foreground h-5 w-5" />
                  <div className="text-2xl font-bold">95%</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Interview Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Detailed analytics and insights about your job interviews will
                be displayed here as you receive more applications.
              </p>
              <div className="bg-muted/20 mt-6 flex h-[200px] w-full items-center justify-center rounded-md">
                <p className="text-muted-foreground">
                  Charts and data visualization will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </LayoutContent>
      </Layout>
    );
  } catch (error) {
    notFound();
  }
}
