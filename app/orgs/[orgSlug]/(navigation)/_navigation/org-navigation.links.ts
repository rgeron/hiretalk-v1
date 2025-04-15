import type {
  NavigationGroup,
  NavigationLink,
} from "@/features/navigation/navigation.type";
import type { AuthRole } from "@/lib/auth/auth-permissions";
import { isInRoles } from "@/lib/organizations/is-in-roles";
import {
  Briefcase,
  CreditCard,
  FileText,
  Settings,
  TriangleAlert,
  User2,
} from "lucide-react";

const replaceSlug = (href: string, slug: string) => {
  return href.replace(":organizationSlug", slug);
};

export const getOrganizationNavigation = (
  slug: string,
  userRoles: AuthRole[] | undefined,
): NavigationGroup[] => {
  return ORGANIZATION_LINKS.map((group: NavigationGroup) => {
    return {
      ...group,
      defaultOpenStartPath: group.defaultOpenStartPath
        ? replaceSlug(group.defaultOpenStartPath, slug)
        : undefined,
      links: group.links
        .filter((link: NavigationLink) =>
          link.roles ? isInRoles(userRoles, link.roles) : true,
        )
        .map((link: NavigationLink) => {
          return {
            ...link,
            href: replaceSlug(link.href, slug),
          };
        }),
    };
  });
};

const ORGANIZATION_PATH = `/orgs/:organizationSlug`;

export const ORGANIZATION_LINKS: NavigationGroup[] = [
  {
    title: "Offers",
    links: [
      {
        href: `${ORGANIZATION_PATH}/job-offers`,
        Icon: Briefcase,
        label: "Job offers",
      },
      {
        href: `${ORGANIZATION_PATH}/templates`,
        Icon: FileText,
        label: "Templates",
      },
    ],
  },
  {
    title: "Organization",
    defaultOpenStartPath: `${ORGANIZATION_PATH}/settings`,
    links: [
      {
        href: `${ORGANIZATION_PATH}/settings`,
        Icon: Settings,
        label: "Settings",
      },
      {
        href: `${ORGANIZATION_PATH}/settings/members`,
        Icon: User2,
        label: "Members",
        roles: ["admin"],
      },
      {
        href: `${ORGANIZATION_PATH}/settings/billing`,
        label: "Billing",
        roles: ["admin"],
        Icon: CreditCard,
      },
      {
        href: `${ORGANIZATION_PATH}/settings/danger`,
        label: "Danger Zone",
        roles: ["owner"],
        Icon: TriangleAlert,
      },
    ],
  },
] satisfies NavigationGroup[];
