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
import { redirect } from "next/navigation";
import { NewTemplateForm } from "./new-template-form";

export const generateMetadata = combineWithParentMetadata({
  title: "Create Template",
  description: "Create a new interview template",
});

export default async function NewTemplatePage(
  props: PageParams<{
    orgSlug: string;
  }>,
) {
  const params = await props.params;

  // Check if user has permission to create templates
  const canCreate = await hasPermission({
    organization: ["update"],
  });

  if (!canCreate) {
    redirect(`/orgs/${params.orgSlug}/job-offers/templates`);
  }

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
        <LayoutTitle>Create New Template</LayoutTitle>
      </LayoutHeader>

      <LayoutContent className="flex flex-col gap-6">
        <NewTemplateForm orgSlug={params.orgSlug} />
      </LayoutContent>
    </Layout>
  );
}
