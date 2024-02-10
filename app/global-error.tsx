"use client";

import { Page500 } from "@/components/page/Page500";
import { HeaderBase } from "@/features/layout/HeaderBase";

export default function ErrorPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <HeaderBase />
      <div className="flex flex-1 items-center justify-center">
        <Page500 />
      </div>
    </div>
  );
}
