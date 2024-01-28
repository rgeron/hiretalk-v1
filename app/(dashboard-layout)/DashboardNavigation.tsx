import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/features/auth/HeaderAuthButton";
import { UserDropdown } from "@/features/auth/UserDropdown";
import { ContactFeedbackPopover } from "@/features/contact/feedback/ContactFeedbackPopover";
import { ThemeToggle } from "@/features/theme/ThemeToggle";
import { requiredAuth } from "@/lib/auth/helper";
import { SiteConfig } from "@/site-config";
import Image from "next/image";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { DashboardDesktopMenu } from "./DashboardDesktopMenu";
import { DashboardMobileMenu } from "./DashboardMobileMenu";

export const DashboardNavigation = async (props: PropsWithChildren) => {
  const session = await requiredAuth();
  return (
    <div className="flex h-full flex-col lg:flex-row lg:overflow-hidden">
      {/* Desktop ONLY Navigation bar */}
      <div className="flex h-full w-full max-w-[240px] flex-col border-r border-border px-2 py-4 max-lg:hidden">
        <div className="flex items-center gap-2">
          <Image
            src={SiteConfig.appIcon}
            alt="app logo"
            width={24}
            height={24}
          />
          <Link href="/" className="text-xl font-bold">
            {SiteConfig.title}
          </Link>
        </div>
        <div className="h-10" />
        <DashboardDesktopMenu />
        <div className="flex-1" />
        <UserDropdown>
          <Button variant="outline" size="sm">
            <Avatar className="mr-2 h-6 w-6">
              <AvatarFallback>
                {session.user.email ? session.user.email.slice(0, 2) : "??"}
              </AvatarFallback>
              {session.user.image && <AvatarImage src={session.user.image} />}
            </Avatar>
            <span className="max-lg:hidden">{session.user.name}</span>
          </Button>
        </UserDropdown>
      </div>
      {/* Main container */}
      <div className="flex-1">
        {/* Header */}
        <header className="w-full border-b bg-background max-lg:sticky max-lg:top-0 max-lg:z-40">
          <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
            <div className="flex items-center gap-2 lg:hidden">
              <Image
                src={SiteConfig.appIcon}
                alt="app logo"
                width={32}
                height={32}
              />
              <Link href="/" className="text-lg font-bold ">
                {SiteConfig.title}
              </Link>
            </div>

            <div className="flex flex-1 items-center justify-end space-x-4">
              <nav className="flex items-center space-x-1 lg:hidden">
                <AuthButton />
                <ThemeToggle />
                <DashboardMobileMenu />
              </nav>
              <nav className="flex items-center space-x-1 max-lg:hidden">
                <ContactFeedbackPopover>
                  <Button variant="outline" size="sm">
                    Feedback
                  </Button>
                </ContactFeedbackPopover>
                <ThemeToggle />
              </nav>
            </div>
          </div>
        </header>

        {/* Content of the page */}
        <main className="py-4 lg:max-h-[calc(100vh_-_64px)] lg:flex-1 lg:overflow-auto lg:py-8">
          {props.children}
        </main>
      </div>
    </div>
  );
};
