import { Button } from "@/components/ui/button";
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { LoadingTemplateCards } from "./template-loading";

export default function Loading() {
  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Interview Templates</LayoutTitle>
      </LayoutHeader>
      <LayoutActions className="flex gap-2">
        <Button variant="default" disabled>
          Create Template
        </Button>
      </LayoutActions>
      <LayoutContent className="flex flex-col gap-4 lg:gap-6">
        <h2 className="text-xl font-semibold">Your Templates</h2>
        <LoadingTemplateCards count={6} />
      </LayoutContent>
    </Layout>
  );
}
