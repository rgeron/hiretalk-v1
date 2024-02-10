"use client";

import { Page400 } from "@/components/page/Page400";
import { HeaderBase } from "@/features/layout/HeaderBase";

export default function ErrorPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <HeaderBase />
      <div className="flex flex-1 items-center justify-center">
        <Page400 />
      </div>
    </div>
  );
}
