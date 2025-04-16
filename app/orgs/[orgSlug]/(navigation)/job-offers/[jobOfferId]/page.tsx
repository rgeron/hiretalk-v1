import { Badge } from "@/components/ui/badge";
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
import { format } from "date-fns";
import { ArrowLeft, Calendar, Clock, Users } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJobOfferByIdAction } from "../job-offer.action";

export const generateMetadata = combineWithParentMetadata({
  title: "Job Offer Details",
  description: "View details of your job offer",
});

export default async function JobOfferDetailsPage(
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

    // Get badge variant based on status
    const getBadgeVariant = (status: string) => {
      switch (status.toLowerCase()) {
        case "to be launched":
          return "outline";
        case "ongoing":
          return "default";
        case "closed":
          return "secondary";
        default:
          return "outline";
      }
    };

    // Get duration text
    const getDurationText = (min: number, max: number) => {
      if (min === max) return `${min} minutes`;
      return `${min}-${max} minutes`;
    };

    // Translate interview type
    const getInterviewTypeLabel = (type: string) => {
      const types: Record<string, string> = {
        motivation: "Motivation",
        technical: "Technical",
        scenario: "Scenario Simulation",
      };
      return types[type.toLowerCase()] || type;
    };

    // Translate interviewer style
    const getInterviewerStyleLabel = (style: string) => {
      const styles: Record<string, string> = {
        friendly: "Friendly",
        formal: "Formal",
        direct: "Direct",
        humorous: "Humorous",
      };
      return styles[style.toLowerCase()] || style;
    };

    return (
      <Layout>
        <LayoutHeader>
          <Button variant="outline" size="sm" asChild className="mb-2">
            <Link href={`/orgs/${params.orgSlug}/job-offers`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Job Offers
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <LayoutTitle>{jobOffer.name}</LayoutTitle>
            <Badge variant={getBadgeVariant(jobOffer.status)}>
              {jobOffer.status}
            </Badge>
          </div>
          <LayoutDescription>{jobOffer.description}</LayoutDescription>
        </LayoutHeader>

        <LayoutContent className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Job Offer Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2">
                  <div className="font-medium">Interview Type</div>
                  <div>{getInterviewTypeLabel(jobOffer.interviewType)}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="font-medium">Interviewer Style</div>
                  <div>
                    {getInterviewerStyleLabel(jobOffer.interviewerStyle)}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="font-medium">Duration</div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {getDurationText(
                      jobOffer.durationMin,
                      jobOffer.durationMax,
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="font-medium">Created</div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(jobOffer.createdAt), "MMMM d, yyyy")}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="font-medium">Applications</div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {jobOffer.applicationCount ?? 0} application
                    {jobOffer.applicationCount !== 1 ? "s" : ""}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manage Applications</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-muted-foreground">
                  Manage applications and interviews for this job offer.
                </p>
                <Button asChild>
                  <Link
                    href={`/orgs/${params.orgSlug}/job-offers/${jobOffer.id}/applications`}
                  >
                    View Applications
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </LayoutContent>
      </Layout>
    );
  } catch (error) {
    notFound();
  }
}
