import { Button } from "@/components/ui/button";
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { hasPermission } from "@/lib/auth/auth-org";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import { combineWithParentMetadata } from "@/lib/metadata";
import type { PageParams } from "@/types/next";
import Link from "next/link";
import { TemplateCard } from "./template-card";
import { getOrganizationTemplates } from "./templates";

export const generateMetadata = combineWithParentMetadata({
  title: "Templates",
  description: "Manage your interview templates",
});

export default async function TemplatesPage(
  props: PageParams<{
    orgSlug: string;
  }>,
) {
  const params = await props.params;
  const org = await getRequiredCurrentOrgCache();

  // Fetch templates for this organization using the service
  const templates = await getOrganizationTemplates(org.id);

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Interview Templates</LayoutTitle>
      </LayoutHeader>
      <LayoutActions className="flex gap-2">
        {(await hasPermission({ templates: ["create"] })) && (
          <Link href={`/orgs/${params.orgSlug}/job-offers/templates/new`}>
            <Button variant="default">Create Template</Button>
          </Link>
        )}
      </LayoutActions>
      <LayoutContent className="flex flex-col gap-4 lg:gap-6">
        {templates.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold">Your Templates</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  orgSlug={params.orgSlug}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">Your Templates</h2>
            <p className="text-muted-foreground">
              No templates created yet. Create your first template to customize
              the AI interview experience for your candidates.
            </p>
          </div>
        )}
      </LayoutContent>
    </Layout>
  );
}
