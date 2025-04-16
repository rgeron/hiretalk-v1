import { resolveActionResult } from "@/lib/actions/actions-utils";
import { JobOfferCard } from "./job-offer-card";
import { getJobOffersAction } from "./job-offer.action";

type JobOffersContentProps = {
  orgSlug: string;
};

export async function JobOffersContent({ orgSlug }: JobOffersContentProps) {
  const jobOffersResult = await resolveActionResult(getJobOffersAction({}));

  if (jobOffersResult.length === 0) {
    return (
      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Your Job Offers</h2>
        <p className="text-muted-foreground">
          No job offers created yet. Create your first job offer to start
          receiving AI-powered voice interviews from candidates.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {jobOffersResult.map((jobOffer) => (
        <JobOfferCard key={jobOffer.id} jobOffer={jobOffer} orgSlug={orgSlug} />
      ))}
    </div>
  );
}
