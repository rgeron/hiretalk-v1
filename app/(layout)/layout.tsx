import { Header } from "@/features/layout/Header";
import type { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  );
}
