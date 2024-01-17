"use client";

import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { DashboardLinks } from "./dashboard-links";

const isCurrentPath = (pathname: string, url: string) => {
  // split the pathame and url with / and compare the length and the matching parts
  const pathnameParts = pathname.split("/");
  const urlParts = url.split("/");

  if (pathnameParts.length !== urlParts.length) {
    return false;
  }

  let isMatch = true;

  for (const [i, pathnamePart] of pathnameParts.entries()) {
    if (pathnamePart !== urlParts[i]) {
      if (pathnamePart.startsWith("?")) {
        break;
      }
      isMatch = false;
      break;
    }
  }

  return isMatch;
};

export const DashboardDesktopMenu = () => {
  const pathname = usePathname() ?? "";
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
              const isCurrent = isCurrentPath(pathname, link.url);

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
