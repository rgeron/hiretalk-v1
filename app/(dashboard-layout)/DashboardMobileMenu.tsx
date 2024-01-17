"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Typography } from "@/components/ui/typography";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DashboardLinks } from "./dashboard-links";

export const DashboardMobileMenu = () => {
  const [open, setOpen] = useState(true);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          {open ? <X /> : <Menu />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-screen">
        {DashboardLinks.map((link) => (
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
