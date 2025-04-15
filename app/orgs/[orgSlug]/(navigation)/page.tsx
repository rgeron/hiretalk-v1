import type { PageParams } from "@/types/next";
import { redirect } from "next/navigation";

export default async function RoutePage(
  props: PageParams<{
    orgSlug: string;
  }>,
) {
  const params = await props.params;

  // Redirect to job-offers page immediately
  redirect(`/orgs/${params.orgSlug}/job-offers`);
}
