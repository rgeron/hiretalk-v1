"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

interface NavLink {
  href: string;
  label: string;
}

type NavLinkGroup = {
  title: string;
  links: NavLink[];
};

const navLinkGroups: NavLinkGroup[] = [
  {
    title: "PERSONAL INFORMATION",
    links: [
      { href: "/account/edit", label: "Edit profile" },
      { href: "/account/delete", label: "Delete profile" },
      { href: "/account/billing", label: "Billing" },
    ],
  },
  {
    title: "EMAIL SETTINGS",
    links: [{ href: "/account/email", label: "Edit email settings" }],
  },
];

export const AccountNavigation = () => {
  return (
    <>
      <AccountNavigationMobile />
      <AccountNavigationDesktop />
    </>
  );
};

const AccountNavigationDesktop = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-2 border-r-2 border-accent pr-4 pt-4 max-md:hidden">
      {navLinkGroups.map((group, i) => {
        return (
          <>
            {i !== 0 && <Separator className="my-1" />}
            <Typography
              variant="small"
              className="ml-2.5 text-xs font-bold uppercase"
            >
              {group.title}
            </Typography>
            <div className="flex flex-col">
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  className={cn(
                    "px-3 py-2 hover:bg-accent w-full rounded-md text-sm transition-colors",
                    {
                      "bg-accent/50": pathname === link.href,
                    }
                  )}
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </>
        );
      })}
    </div>
  );
};

const AccountNavigationMobile = () => {
  const pathname = usePathname();

  const currentGroup = navLinkGroups.find((group) =>
    group.links.some((link) => link.href === pathname)
  );
  const currentLink = currentGroup?.links.find(
    (link) => link.href === pathname
  );

  return (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="lg" className="w-full" variant="outline">
            {currentLink?.label ?? "Account"}{" "}
            <Menu size={16} className="ml-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          {navLinkGroups.map((group, i) => {
            return (
              <Fragment key={group.title + i}>
                {i !== 0 && <DropdownMenuSeparator />}
                <DropdownMenuLabel>{group.title}</DropdownMenuLabel>
                <div className="flex flex-col">
                  {group.links.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href}>{link.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              </Fragment>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
