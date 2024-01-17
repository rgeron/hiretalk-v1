import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, User2 } from "lucide-react";

export const DashboardLinks: {
  title: string;
  icon: LucideIcon;
  url: string;
}[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
  },
  {
    title: "Users",
    icon: User2,
    url: "/users",
  },
];
