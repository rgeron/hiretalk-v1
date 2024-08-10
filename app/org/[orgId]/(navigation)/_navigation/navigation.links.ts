import { Home, Settings, User } from "lucide-react";
import { NavigationLink } from "./OrgLinks";

export const ORGANIZATION_LINKS = [
  {
    href: "/org/:organizationId/",
    icon: Home,
    label: "Dashboard",
  },
  {
    href: "/org/:organizationId/users",
    icon: User,
    label: "Users",
  },
  {
    href: "/org/:organizationId/settings",
    icon: Settings,
    label: "Settings",
    roles: ["ADMIN"],
  },
] satisfies NavigationLink[];
