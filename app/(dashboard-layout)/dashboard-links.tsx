import type { NavigationLinkGroups } from "@/features/navigation/navigation.type";
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

export const DASHBOARD_LINKS: NavigationLinkGroups[] = [
  {
    links: [
      {
        title: "Dashboard",
        icon: <LayoutDashboard />,
        url: "/admin",
      },
      {
        title: "Products",
        icon: <Box />,
        url: "/admin/products",
      },
      {
        title: "Bundles",
        icon: <ShoppingBasket />,
        url: "/admin/bundles",
      },
      {
        title: "Coupons",
        icon: <Percent />,
        url: "/admin/coupons",
      },
      {
        title: "Users",
        icon: <User2 />,
        url: "/admin/users",
      },
    ],
  },
  {
    title: "Other",
    links: [
      {
        title: "Schools",
        icon: <School />,
        url: "/admin/schools",
      },
      {
        title: "Products",
        icon: <MessageCircle />,
        url: "/admin/comments",
      },
      {
        title: "Reports",
        icon: <MessageSquare />,
        url: "/admin/reports",
      },
    ],
  },
];
