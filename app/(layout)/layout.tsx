import { Footer } from "@/features/layout/Footer";
import { Header } from "@/features/layout/Header";
import type { PropsWithChildren } from "react";

export default function RouteLayout(props: PropsWithChildren) {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <div className="min-h-screen flex-1 overflow-auto">{props.children}</div>
      <Footer />
    </div>
  );
}
