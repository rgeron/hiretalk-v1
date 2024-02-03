"use client";

import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/page/layout";
import { buttonVariants } from "@/components/ui/button";
import { logger } from "@/lib/logger";
import type { ErrorParams } from "@/types/next";
import Link from "next/link";
import { useEffect } from "react";

export default function RouteError({ error }: ErrorParams) {
  useEffect(() => {
    // Log the error to an error reporting service
    logger.error(error);
  }, [error]);

  return (
    <div>
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Oops, something went wrong</LayoutTitle>
          <LayoutDescription>
            Please try again later or contact support.
          </LayoutDescription>
        </LayoutHeader>

        <LayoutContent>
          <Link className={buttonVariants()} href="/">
            Home page
          </Link>
        </LayoutContent>
      </Layout>
    </div>
  );
}
