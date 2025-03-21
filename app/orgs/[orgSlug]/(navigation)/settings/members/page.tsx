import { getPlanLimits } from "@/lib/auth/auth-plans";
import { combineWithParentMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import { getOrgsMembers } from "@/query/org/get-orgs-members";
import type { PageParams } from "@/types/next";
import { OrgMembersForm } from "./org-members-form";

export const generateMetadata = combineWithParentMetadata({
  title: "Members",
  description: "Manage your organization members.",
});

export default async function RoutePage(props: PageParams) {
  const org = await getRequiredCurrentOrgCache({
    permissions: {
      member: ["create", "update", "delete"],
    },
  });

  const members = await getOrgsMembers(org.id);

  const maxMembers = getPlanLimits(org.subscription?.plan).members;

  const invitations = await prisma.invitation.findMany({
    where: {
      organizationId: org.id,
    },
  });

  return (
    <OrgMembersForm
      invitations={invitations}
      members={members}
      maxMembers={maxMembers}
    />
  );
}
