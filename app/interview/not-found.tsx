import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function InterviewNotFound() {
  return (
    <div className="container mx-auto max-w-lg px-4 py-12 text-center md:px-0">
      <h1 className="mb-4 text-3xl font-bold">Interview Not Found</h1>
      <p className="text-muted-foreground mb-8">
        The interview link you followed may be expired, invalid, or the job
        offer is no longer accepting applications.
      </p>

      <div className="flex justify-center">
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
