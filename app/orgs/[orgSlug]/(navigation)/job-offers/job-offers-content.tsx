import { resolveActionResult } from "@/lib/actions/actions-utils";
import { JobOfferCard } from "./job-offer-card";
import { getJobOffersAction } from "./job-offer.action";
import { NoJobOffers } from "./no-job-offers";

type JobOffersContentProps = {
  orgSlug: string;
  search?: string;
  status?: string;
};

export async function JobOffersContent({
  orgSlug,
  search,
  status,
}: JobOffersContentProps) {
  const jobOffersResult = await resolveActionResult(getJobOffersAction({}));

  // Apply filters client-side
  const filteredJobOffers = jobOffersResult.filter((jobOffer) => {
    // Filter by search term if provided
    const matchesSearch =
      !search ||
      jobOffer.name.toLowerCase().includes(search.toLowerCase()) ||
      jobOffer.description.toLowerCase().includes(search.toLowerCase());

    // Filter by selected statuses if provided
    const selectedStatuses = status ? status.split(",") : [];
    const matchesStatus =
      selectedStatuses.length === 0 ||
      selectedStatuses.includes(jobOffer.status.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  if (filteredJobOffers.length === 0) {
    // Show special message when filtering results in no matches
    if (search || status) {
      return (
        <div className="w-full rounded-lg border p-6 text-center">
          <h2 className="mb-4 text-xl font-semibold">No matching job offers</h2>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
        </div>
      );
    }

    // Show default empty state
    return <NoJobOffers />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredJobOffers.map((jobOffer) => (
        <JobOfferCard key={jobOffer.id} jobOffer={jobOffer} orgSlug={orgSlug} />
      ))}
    </div>
  );
}
