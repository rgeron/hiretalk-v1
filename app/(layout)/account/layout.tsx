import { Layout } from "@/components/page/layout";
import { PropsWithChildren } from "react";
import { AccountNavigation } from "./AccountNavigation";

export default function AccountLayout({ children }: PropsWithChildren) {
  return (
    <Layout className="max-w-4xl flex max-md:flex-col gap-4">
      <AccountNavigation />
      <main className="flex-1">{children}</main>
    </Layout>
  );
}
