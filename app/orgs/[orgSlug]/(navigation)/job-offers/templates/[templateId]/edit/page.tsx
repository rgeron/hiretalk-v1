import { Button } from "@/components/ui/button";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { hasPermission } from "@/lib/auth/auth-org";
import { combineWithParentMetadata } from "@/lib/metadata";
import type { PageParams } from "@/types/next";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getTemplateDetails } from "../../template-service";
import { TemplateEditForm } from "./template-edit-form";

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
    title: `Edit: ${template.name}`,
    description: "Edit template details and questions",
  });
}

export default async function EditTemplatePage(
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

  if (!canEdit) {
    redirect(
      `/orgs/${params.orgSlug}/job-offers/templates/${params.templateId}`,
    );
  }

  return (
    <Layout size="lg">
      <LayoutHeader>
        <div className="mb-2">
          <Button variant="ghost" size="sm" className="gap-2" asChild>
            <Link
              href={`/orgs/${params.orgSlug}/job-offers/templates/${params.templateId}`}
            >
              <ChevronLeft className="h-4 w-4" />
              Back to template
            </Link>
          </Button>
        </div>
        <LayoutTitle>Edit Template</LayoutTitle>
      </LayoutHeader>

      <LayoutContent className="flex flex-col gap-6">
        <TemplateEditForm template={template} orgSlug={params.orgSlug} />
      </LayoutContent>
    </Layout>
  );
}
