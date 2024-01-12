import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/features/auth/HeaderAuthButton";
import { UserDropdown } from "@/features/auth/UserDropdown";
import { ContactFeedbackPopover } from "@/features/contact/feedback/ContactFeedbackPopover";
import { ThemeToggle } from "@/features/theme/ThemeToggle";
import { requiredAuth } from "@/lib/auth";
import { SiteConfig } from "@/site-config";
import Image from "next/image";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { DashboardDesktopMenu } from "./DashboardDesktopMenu";
import { DashboardMobileMenu } from "./DashboardMobileMenu";

export const DashboardNavigation = (props: PropsWithChildren) => {
  return (
    <>
      <DashboardMobile>{props.children}</DashboardMobile>
      <DashboardDesktop>{props.children}</DashboardDesktop>
    </>
  );
};

const DashboardMobile = (props: PropsWithChildren) => {
  return (
    <div className="flex h-full flex-col lg:hidden">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex items-center gap-2">
            <Image
              src={SiteConfig.appIcon}
              alt="app logo"
              width={32}
              height={32}
            />
            <Link href="/" className="text-xl font-bold">
              {SiteConfig.title}
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <AuthButton />
              <ThemeToggle />
              <DashboardMobileMenu />
            </nav>
          </div>
        </div>
      </header>
      <div className="container flex-1 pt-4">{props.children}</div>
    </div>
  );
};

const DashboardDesktop = async (props: PropsWithChildren) => {
  const session = await requiredAuth();
  return (
    <div className="flex h-full flex-row max-lg:hidden">
      <div className="flex h-full w-full max-w-[240px] flex-col border-r border-border px-2 py-4">
        <div className="flex items-center gap-2">
          <Image
            src={SiteConfig.appIcon}
            alt="app logo"
            width={32}
            height={32}
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
      <main className="flex-1">
        <header className="w-full border-b bg-background">
          <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
            <div className="flex flex-1 items-center justify-end space-x-4">
              <nav className="flex items-center space-x-1">
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
        <div className="m-auto max-w-4xl flex-1 px-2 py-8">
          {props.children}
        </div>
      </main>
    </div>
  );
};
