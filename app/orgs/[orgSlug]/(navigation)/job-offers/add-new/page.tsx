import { Button } from "@/components/ui/button";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { combineWithParentMetadata } from "@/lib/metadata";
import type { PageParams } from "@/types/next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { InterviewQuestionsProvider } from "./interview-questions-provider";

export const generateMetadata = combineWithParentMetadata({
  title: "Create Job Offer",
  description: "Create a new job offer for AI-powered voice interviews",
});

export default async function AddNewJobOfferPage(
  props: PageParams<{
    orgSlug: string;
  }>,
) {
  const params = await props.params;

  return (
    <Layout size="lg">
      <LayoutHeader className="flex items-center justify-between">
        <Button variant="outline" size="sm" asChild className="mr-auto">
          <Link href={`/orgs/${params.orgSlug}/job-offers`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go back
          </Link>
        </Button>
        <LayoutTitle>Create New Job Offer</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <InterviewQuestionsProvider orgSlug={params.orgSlug} />
      </LayoutContent>
    </Layout>
  );
}
