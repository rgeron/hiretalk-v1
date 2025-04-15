import { Button } from "@/components/ui/button";
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { hasPermission } from "@/lib/auth/auth-org";
import { combineWithParentMetadata } from "@/lib/metadata";
import type { PageParams } from "@/types/next";

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

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Interview Templates</LayoutTitle>
      </LayoutHeader>
      <LayoutActions className="flex gap-2">
        {(await hasPermission({ templates: ["create"] })) && (
          <Button variant="default">Create Template</Button>
        )}
      </LayoutActions>
      <LayoutContent className="flex flex-col gap-4 lg:gap-6">
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Your Templates</h2>
          <p className="text-muted-foreground">
            No templates created yet. Create your first template to customize
            the AI interview experience for your candidates.
          </p>
        </div>
      </LayoutContent>
    </Layout>
  );
}
