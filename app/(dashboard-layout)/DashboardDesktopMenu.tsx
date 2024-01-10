"use client";

import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement } from "react";
import { DashboardLinks } from "./dashboard-links";

export const DashboardDesktopMenu = () => {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-2">
      {DashboardLinks.map((link) => (
        <Link
          key={link.url}
          className={cn(
            "px-3 py-2 flex items-center gap-2 hover:bg-accent w-full rounded-md text-sm transition-colors",
            {
              "bg-accent/50": pathname.startsWith(link.url),
            }
          )}
          href={link.url}
        >
          {cloneElement(link.icon, { size: 16 })}
          <Typography variant="large" as="span" className="text-base">
            {link.title}
          </Typography>
        </Link>
      ))}
    </nav>
  );
};
