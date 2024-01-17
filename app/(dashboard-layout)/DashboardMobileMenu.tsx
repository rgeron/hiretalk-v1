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
import { Typography } from "@/components/ui/typography";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Fragment, useState } from "react";
import { DashboardLinks } from "./dashboard-links";

export const DashboardMobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          {open ? <X /> : <Menu />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-screen">
        {DashboardLinks.map((section, index) => (
          <Fragment key={index}>
            {section.title ? (
              <DropdownMenuLabel>{section.title}</DropdownMenuLabel>
            ) : null}
            {section.links.map((link) => (
              <DropdownMenuItem key={link.url} asChild>
                <Typography
                  as={Link}
                  variant="large"
                  className="flex items-center gap-2 text-base"
                  href={link.url}
                  onClick={() => setOpen(false)}
                >
                  <link.icon size={16} />
                  <span>{link.title}</span>
                </Typography>
              </DropdownMenuItem>
            ))}
            {index < DashboardLinks.length - 1 ? (
              <DropdownMenuSeparator />
            ) : null}
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
