import { Button } from "@/components/ui/button";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function TemplateNotFound() {
  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Template Not Found</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col items-center justify-center py-12 text-center">
        <FileQuestion className="text-muted-foreground mb-6 h-16 w-16" />
        <h2 className="mb-2 text-2xl font-semibold">Template Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          The template you're looking for doesn't exist or you don't have
          permission to access it.
        </p>
        <Button asChild>
          <Link href="../">Return to Templates</Link>
        </Button>
      </LayoutContent>
    </Layout>
  );
}
