import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { ChevronLeft } from "lucide-react";

export default function Loading() {
  return (
    <Layout size="lg">
      <LayoutHeader>
        <div className="mb-2">
          <Button variant="ghost" size="sm" className="gap-2" disabled>
            <ChevronLeft className="h-4 w-4" />
            Back to templates
          </Button>
        </div>
        <LayoutTitle>Create New Template</LayoutTitle>
      </LayoutHeader>

      <LayoutContent className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Template Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-24 w-full" />
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="ml-auto h-10 w-36" />
          </CardFooter>
        </Card>
      </LayoutContent>
    </Layout>
  );
} 