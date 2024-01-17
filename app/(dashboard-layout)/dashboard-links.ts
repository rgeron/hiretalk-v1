import type { LucideIcon } from "lucide-react";
import {
  Box,
  LayoutDashboard,
  MessageCircle,
  MessageSquare,
  Percent,
  School,
  ShoppingBasket,
  User2,
} from "lucide-react";

type DashboardLinkItem = {
  title: string;
  icon: LucideIcon;
  url: string;
};

type DashboardLinkGroups = {
  title?: string;
  links: DashboardLinkItem[];
};

export const DashboardLinks: DashboardLinkGroups[] = [
  {
    links: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        url: "/admin",
      },
      {
        title: "Products",
        icon: Box,
        url: "/admin/products",
      },
      {
        title: "Bundles",
        icon: ShoppingBasket,
        url: "/admin/bundles",
      },
      {
        title: "Coupons",
        icon: Percent,
        url: "/admin/coupons",
      },
      {
        title: "Users",
        icon: User2,
        url: "/admin/users",
      },
    ],
  },
  {
    title: "Other",
    links: [
      {
        title: "Schools",
        icon: School,
        url: "/admin/schools",
      },
      {
        title: "Products",
        icon: MessageCircle,
        url: "/admin/comments",
      },
      {
        title: "Reports",
        icon: MessageSquare,
        url: "/admin/reports",
      },
    ],
  },
];
