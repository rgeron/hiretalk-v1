import { AlertCircle, Coins, Mail, User2 } from "lucide-react";
import type { NavigationLinkGroups } from "../(dashboard-layout)/dashboard-links";

export const ACCOUNT_LINKS: NavigationLinkGroups[] = [
  {
    title: "PERSONAL INFORMATION",
    links: [
      { url: "/account/edit", title: "Edit profile", icon: <User2 /> },
      {
        url: "/account/delete",
        title: "Delete profile",
        icon: <AlertCircle />,
      },
      { url: "/account/billing", title: "Billing", icon: <Coins /> },
    ],
  },
  {
    title: "EMAIL SETTINGS",
    links: [
      { url: "/account/email", title: "Edit email settings", icon: <Mail /> },
    ],
  },
];
