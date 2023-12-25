import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/page/layout";
import { buttonVariants } from "@/components/ui/button";
import { Header } from "@/features/layout/Header";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function SuccessPaymentPage() {
  // You can delete this line if you want to use the "new-user" page to create an onboarding.
  redirect("/");

  return (
    <>
      <Header />
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Successfully login</LayoutTitle>
          <LayoutDescription>You can now use the app</LayoutDescription>
        </LayoutHeader>
        <LayoutContent>
          <Link href="/" className={buttonVariants({ size: "lg" })}>
            Get Started
          </Link>
        </LayoutContent>
      </Layout>
    </>
  );
}
