import { Footer } from "@/features/layout/Footer";
import { Header } from "@/features/layout/Header";
import type { PropsWithChildren } from "react";

export default function RouteLayout(props: PropsWithChildren) {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <div className="min-h-full flex-1">{props.children}</div>
      <Footer />
    </div>
  );
}
