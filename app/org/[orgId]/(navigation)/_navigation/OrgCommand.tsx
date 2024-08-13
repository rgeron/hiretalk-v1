"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  CmdOrOption,
  KeyboardShortcut,
} from "@/components/ui/keyboard-shortcut";
import { Search } from "lucide-react";
import { useState } from "react";
import { useKey } from "react-use";
import { ORGANIZATION_LINKS } from "./org-navigation.links";

export function OrganizationCommand() {
  const [open, setOpen] = useState(false);

  const down = () => {
    setOpen((open) => !open);
  };

  useKey(
    (event) => (event.ctrlKey || event.metaKey) && event.key === "k",
    down,
    {
      event: "keydown",
      options: {
        capture: true,
      },
    },
  );

  return (
    <>
      <div className="relative w-full max-w-[200px] md:w-2/3 lg:w-1/3">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full appearance-none bg-background pl-8 shadow-none"
          onClick={() => {
            setOpen(true);
          }}
        />

        <div className="pointer-events-none absolute right-2.5 top-2.5 inline-flex h-5 select-none items-center gap-1">
          <KeyboardShortcut eventKey="cmd">
            <CmdOrOption />
          </KeyboardShortcut>
          <KeyboardShortcut eventKey="k">K</KeyboardShortcut>
        </div>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {ORGANIZATION_LINKS.map((link, index) => (
              <CommandItem key={index}>
                <link.icon className="mr-2 size-4" />
                <span>{link.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
