import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { hasPermission } from "@/lib/auth/auth-org";
import { combineWithParentMetadata } from "@/lib/metadata";
import type { PageParams } from "@/types/next";
import { format } from "date-fns";
import { ChevronLeft, Clock, Edit, PlusCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTemplateDetails } from "../template-service";
import { TemplateInfoCard } from "./template-info-card";
import { TemplateQuestions } from "./template-questions";

export async function generateMetadata({
  params,
}: PageParams<{ templateId: string }>) {
  const parsedParams = await params;
  const template = await getTemplateDetails(parsedParams.templateId);

  if (!template) {
    return {
      title: "Template Not Found",
    };
  }

  return combineWithParentMetadata({
    title: template.name,
    description: template.description ?? "Job offer template details",
  });
}

export default async function TemplateDetailsPage(
  props: PageParams<{
    orgSlug: string;
    templateId: string;
  }>,
) {
  const params = await props.params;
  const template = await getTemplateDetails(params.templateId);

  if (!template) {
    notFound();
  }

  const canEdit = await hasPermission({
    organization: ["update"],
  });

  return (
    <Layout size="lg">
      <LayoutHeader>
        <div className="mb-2">
          <Button variant="ghost" size="sm" className="gap-2" asChild>
            <Link href={`/orgs/${params.orgSlug}/job-offers/templates`}>
              <ChevronLeft className="h-4 w-4" />
              Back to templates
            </Link>
          </Button>
        </div>
        <LayoutTitle>{template.name}</LayoutTitle>
        <LayoutDescription>
          {template.description ?? "No description provided"}
        </LayoutDescription>
        <div className="text-muted-foreground mt-2 flex items-center gap-2 text-xs">
          <Clock className="h-3 w-3" />
          <span>
            Created {format(new Date(template.createdAt), "MMMM d, yyyy")}
          </span>
        </div>
      </LayoutHeader>

      <LayoutActions className="flex gap-2">
        {canEdit && (
          <Button variant="outline" asChild>
            <Link
              href={`/orgs/${params.orgSlug}/job-offers/templates/${params.templateId}/edit`}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Template
            </Link>
          </Button>
        )}
        <Button variant="default" asChild>
          <Link
            href={`/orgs/${params.orgSlug}/job-offers/add-new?templateId=${params.templateId}`}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Use Template
          </Link>
        </Button>
      </LayoutActions>

      <LayoutContent className="flex flex-col gap-6">
        <TemplateInfoCard template={template} />

        <div>
          <h2 className="text-xl font-semibold">Interview Questions</h2>
          <Separator className="my-4" />
          <TemplateQuestions
            questions={template.questions}
            canEdit={canEdit}
            templateId={params.templateId}
            orgSlug={params.orgSlug}
          />
        </div>
      </LayoutContent>
    </Layout>
  );
}
