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

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">
        <Layout>
          <LayoutHeader>
            <LayoutTitle>Not found - 404</LayoutTitle>
            <LayoutDescription>
              The page you are looking for does not exist.
            </LayoutDescription>
          </LayoutHeader>
          <LayoutContent>
            <Link href="/" className={buttonVariants()}>
              Back to home page
            </Link>
          </LayoutContent>
        </Layout>
      </div>
    </div>
  );
}
