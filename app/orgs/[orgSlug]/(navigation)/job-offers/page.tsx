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
import Link from "next/link";

export const generateMetadata = combineWithParentMetadata({
  title: "Job Offers",
  description: "Manage your job offers",
});

export default async function JobOffersPage(
  props: PageParams<{
    orgSlug: string;
  }>,
) {
  const params = await props.params;

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Job Offers</LayoutTitle>
      </LayoutHeader>
      <LayoutActions className="flex gap-2">
        {(await hasPermission({
          organization: ["update"],
        })) && (
          <Button variant="default" asChild>
            <Link href={`/orgs/${params.orgSlug}/job-offers/add-new`}>
              New offer
            </Link>
          </Button>
        )}
      </LayoutActions>
      <LayoutContent className="flex flex-col gap-4 lg:gap-6">
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Your Job Offers</h2>
          <p className="text-muted-foreground">
            No job offers created yet. Create your first job offer to start
            receiving AI-powered voice interviews from candidates.
          </p>
        </div>
      </LayoutContent>
    </Layout>
  );
}
