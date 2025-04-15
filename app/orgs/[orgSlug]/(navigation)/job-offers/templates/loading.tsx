import { Skeleton } from "@/components/ui/skeleton";
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";

export default function Loading() {
  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Interview Templates</LayoutTitle>
      </LayoutHeader>
      <LayoutActions className="flex gap-2">
        <Skeleton className="h-10 w-32" />
      </LayoutActions>
      <LayoutContent className="flex flex-col gap-4 lg:gap-6">
        <Skeleton className="h-64 w-full rounded-lg" />
      </LayoutContent>
    </Layout>
  );
}
