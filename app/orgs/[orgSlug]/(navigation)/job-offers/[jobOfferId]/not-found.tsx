import { Button } from "@/components/ui/button";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function JobOfferNotFound() {
  return (
    <Layout>
      <LayoutHeader>
        <Button variant="outline" size="sm" asChild className="mb-2">
          <Link href="/orgs/slug/job-offers">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Job Offers
          </Link>
        </Button>
        <LayoutTitle>Job Offer Not Found</LayoutTitle>
      </LayoutHeader>

      <LayoutContent className="flex flex-col items-center justify-center py-12">
        <div className="max-w-md text-center">
          <h2 className="mb-4 text-xl font-semibold">
            This job offer doesn&apos;t exist or has been removed
          </h2>
          <p className="text-muted-foreground mb-6">
            The job offer you&apos;re looking for might have been deleted or you
            might not have permission to view it.
          </p>
          <Button asChild>
            <Link href="/orgs/slug/job-offers">Go to Job Offers</Link>
          </Button>
        </div>
      </LayoutContent>
    </Layout>
  );
}
