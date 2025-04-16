import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function JobOfferDetailsLoading() {
  return (
    <Layout>
      <LayoutHeader>
        <Button variant="outline" size="sm" asChild className="mb-2">
          <Link href="/orgs/slug/job-offers">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Job Offers
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <LayoutTitle>
            <Skeleton className="h-8 w-48" />
          </LayoutTitle>
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-5 w-full max-w-lg" />
      </LayoutHeader>

      <LayoutContent className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-7 w-32" />
            </CardHeader>
            <CardContent className="grid gap-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="grid grid-cols-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-40" />
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-7 w-40" />
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>
      </LayoutContent>
    </Layout>
  );
}
