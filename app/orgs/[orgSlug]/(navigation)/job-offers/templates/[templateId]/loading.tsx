import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { ChevronLeft } from "lucide-react";

export default function TemplateLoading() {
  return (
    <Layout size="lg">
      <LayoutHeader>
        <div className="mb-2">
          <Button variant="ghost" size="sm" className="gap-2" disabled>
            <ChevronLeft className="h-4 w-4" />
            Back to templates
          </Button>
        </div>
        <LayoutTitle>
          <Skeleton className="h-8 w-64" />
        </LayoutTitle>
        <div className="mt-2 h-4">
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Skeleton className="h-4 w-32" />
        </div>
      </LayoutHeader>

      <LayoutActions className="flex gap-2">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </LayoutActions>

      <LayoutContent className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Template Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <h3 className="mb-1 text-sm font-medium">Name</h3>
              <Skeleton className="h-5 w-48" />
            </div>

            <div>
              <h3 className="mb-1 text-sm font-medium">Description</h3>
              <Skeleton className="h-5 w-full" />
              <Skeleton className="mt-1 h-5 w-3/4" />
            </div>

            <div>
              <h3 className="mb-1 text-sm font-medium">Created On</h3>
              <Skeleton className="h-5 w-40" />
            </div>

            <div>
              <h3 className="mb-1 text-sm font-medium">Number of Questions</h3>
              <Skeleton className="h-5 w-24" />
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-xl font-semibold">Interview Questions</h2>
          <Separator className="my-4" />

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Skeleton className="mb-2 h-4 w-20" />
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="mt-1 h-5 w-2/3" />
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <Skeleton className="h-8 w-8 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </LayoutContent>
    </Layout>
  );
}
