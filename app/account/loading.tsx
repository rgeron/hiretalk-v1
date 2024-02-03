import type { LayoutParams } from "@/types/next";
import { AccountNavigation } from "./AccountNavigation";
import { Skeleton } from "@/components/ui/skeleton";

export default async function RouteLayout(props: LayoutParams<{}>) {
  return (
    <AccountNavigation>
      <Skeleton className="h-12" />
    </AccountNavigation>
  );
}
