import { Layout } from "@/components/page/layout";
import type { PropsWithChildren } from "react";
import { AccountNavigation } from "./AccountNavigation";

export default function AccountLayout({ children }: PropsWithChildren) {
  return (
    <Layout className="flex max-w-4xl gap-4 max-md:flex-col">
      <AccountNavigation />
      <main className="flex-1">{children}</main>
    </Layout>
  );
}
