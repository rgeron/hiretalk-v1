"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsClient } from "usehooks-ts";

const useHost = () => {
  const isClient = useIsClient();

  if (!isClient) {
    return "";
  }

  const host = window.location.href;

  return `${host}`;
};

export const LoginButton = () => {
  const host = useHost();
  const pathname = usePathname();

  const currentUrl = `${host}${pathname}`;

  return (
    <Link
      className={buttonVariants({ size: "sm", variant: "ghost" })}
      href={`/auth/signin?callbackUrl=${currentUrl}`}
    >
      Sign in
    </Link>
  );
};
