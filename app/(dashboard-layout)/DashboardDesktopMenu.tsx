"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardLinks } from "./dashboard-links";

export const DashboardDesktopMenu = () => {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-2">
      {DashboardLinks.map((link) => (
        <Link
          key={link.url}
          className={cn(
            "flex h-8 items-center gap-2 rounded-md px-2 text-sm transition-colors",
            "hover:bg-card",
            {
              "bg-accent/50 hover:bg-accent/80": pathname.startsWith(link.url),
            }
          )}
          href={link.url}
        >
          <link.icon size={16} />
          <span className="flex h-8 items-center gap-2 rounded-md px-2 text-sm">
            {link.title}
          </span>
        </Link>
      ))}
    </nav>
  );
};
