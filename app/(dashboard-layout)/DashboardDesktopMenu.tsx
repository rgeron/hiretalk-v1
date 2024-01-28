"use client";

import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { DashboardLinks } from "./dashboard-links";

const useCurrentPath = () => {
  const currentPath = usePathname() ?? "";
  const pathSegments = currentPath.split("/");
  const allDashboardLinks = DashboardLinks.flatMap((section) => section.links);

  const linkMatchCounts = allDashboardLinks.map((link) => ({
    url: link.url,
    matchCount: link.url
      .split("/")
      .filter((segment, index) => segment === pathSegments[index]).length,
  }));

  const mostMatchingLink = linkMatchCounts.reduce(
    (maxMatchLink, currentLink) =>
      currentLink.matchCount > maxMatchLink.matchCount
        ? currentLink
        : maxMatchLink,
    { url: "", matchCount: 0 }
  );

  return mostMatchingLink.url;
};

export const DashboardDesktopMenu = () => {
  const currentPath = useCurrentPath();

  return (
    <nav className="flex flex-col gap-4">
      {DashboardLinks.map((section, index) => (
        <Fragment key={index}>
          {section.title ? (
            <Typography variant="muted" className="px-2">
              {section.title}
            </Typography>
          ) : null}
          <div className="flex flex-col gap-2">
            {section.links.map((link) => {
              const isCurrent = currentPath === link.url;

              return (
                <Link
                  key={link.url}
                  className={cn(
                    "flex h-8 items-center gap-2 rounded-md px-2 text-sm transition-colors",
                    "hover:bg-card",
                    {
                      "bg-accent/50 hover:bg-accent/80": isCurrent,
                    }
                  )}
                  href={link.url}
                >
                  <link.icon size={16} />
                  <span className="flex h-8 items-center gap-2 rounded-md px-2 text-sm">
                    {link.title}
                  </span>
                </Link>
              );
            })}
          </div>
          {index < DashboardLinks.length - 1 ? <Separator /> : null}
        </Fragment>
      ))}
    </nav>
  );
};
