"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsClient } from "usehooks-ts";
import { UserDropdown } from "./UserDropdown";

const useHost = () => {
  const isClient = useIsClient();

  if (!isClient) {
    return "";
  }

  const host = window.location.href;

  return `${host}`;
};

export const SignInButton = () => {
  const host = useHost();
  const pathname = usePathname();

  const currentUrl = `${host}${pathname}`;

  return (
    <Link
      className={buttonVariants({ size: "sm", variant: "outline" })}
      href={`/auth/signin?callbackUrl=${currentUrl}`}
    >
      Sign in
    </Link>
  );
};

export const SignInButtonWithUser = () => {
  const session = useSession();

  if (session?.data?.user) {
    const user = session.data.user;
    return (
      <UserDropdown>
        <Button variant="outline" size="sm">
          <Avatar className="mr-2 size-6">
            <AvatarFallback>
              {user.email ? user.email.slice(0, 2) : "??"}
            </AvatarFallback>
            {user.image && <AvatarImage src={user.image} />}
          </Avatar>
          <span className="max-lg:hidden">{user.name}</span>
        </Button>
      </UserDropdown>
    );
  }

  return <SignInButton />;
};
