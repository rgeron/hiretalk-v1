import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { resolveActionResult } from "@/lib/actions/actions-utils";
import { combineWithParentMetadata } from "@/lib/metadata";
import type { PageParams } from "@/types/next";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  Clock,
  HelpCircle,
  Pencil,
  Users,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJobOfferByIdAction } from "../job-offer.action";
import { CollapsibleDescription } from "./collapsible-description";
import { InteractiveStatusBadge } from "./interactive-status-badge";
import { JobOfferTabs } from "./job-offer-tabs";

export const generateMetadata = combineWithParentMetadata({
  title: "Job Offer Details",
  description: "View details of your job offer",
});

// Define question type
type Question = {
  text: string;
  order?: number;
};

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

    // Parse the questions from the JSON
    const questions: Question[] = [];
    if (jobOffer.questions) {
      if (Array.isArray(jobOffer.questions)) {
        jobOffer.questions.forEach((q) => {
          if (typeof q === "string") {
            questions.push({ text: q });
          } else if (q && typeof q === "object" && "text" in q) {
            questions.push(q as Question);
          }
        });
      } else if (typeof jobOffer.questions === "object") {
        Object.values(jobOffer.questions).forEach((q) => {
          if (typeof q === "string") {
            questions.push({ text: q });
          } else if (q && typeof q === "object" && "text" in q) {
            questions.push(q as Question);
          }
        });
      }
    }

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
            <InteractiveStatusBadge
              status={jobOffer.status}
              jobOfferId={jobOffer.id}
            />
          </div>
          <CollapsibleDescription description={jobOffer.description} />
        </LayoutHeader>

        <LayoutContent className="flex flex-col gap-6">
          <JobOfferTabs
            orgSlug={params.orgSlug}
            jobOfferId={jobOffer.id}
            activeTab="job-offer"
          />

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
                    {jobOffer.applicationCount} application
                    {jobOffer.applicationCount !== 1 ? "s" : ""}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interview Questions</CardTitle>
              </CardHeader>
              <CardContent>
                {questions.length > 0 ? (
                  <ul className="space-y-3">
                    {questions.map((question, index) => (
                      <li key={index} className="flex gap-2">
                        <HelpCircle className="text-muted-foreground h-5 w-5 flex-shrink-0" />
                        <span>{question.text}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-muted-foreground italic">
                    No questions defined for this job offer.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex justify-end">
            <Button asChild>
              <Link
                href={`/orgs/${params.orgSlug}/job-offers/${jobOffer.id}/edit`}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit Job Offer
              </Link>
            </Button>
          </div>
        </LayoutContent>
      </Layout>
    );
  } catch {
    notFound();
  }
}
