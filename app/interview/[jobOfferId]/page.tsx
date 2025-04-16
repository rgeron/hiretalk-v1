import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { InterviewForm } from "./interview-form";

export const metadata = {
  title: "Job Interview",
  description: "Complete your interview for the job position",
};

export default async function InterviewPage({
  params,
}: {
  params: Promise<{ jobOfferId: string }>;
}) {
  // Await the params before destructuring
  const { jobOfferId } = await params;

  // Find the job offer
  const jobOffer = await prisma.jobOffer.findUnique({
    where: { id: jobOfferId },
    include: {
      organization: {
        select: {
          name: true,
          logo: true,
        },
      },
    },
  });

  if (!jobOffer) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-lg px-4 py-8 md:px-0">
      <div className="mb-8 text-center">
        {jobOffer.organization.logo && (
          <div className="mb-4 flex justify-center">
            <img
              src={jobOffer.organization.logo}
              alt={`${jobOffer.organization.name} logo`}
              className="h-12 w-auto"
            />
          </div>
        )}
        <h1 className="mb-2 text-2xl font-bold">{jobOffer.name}</h1>
        <p className="text-muted-foreground">{jobOffer.description}</p>
      </div>

      <div className="bg-card rounded-lg border p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Job Details</h2>
        <div className="mb-6 space-y-2">
          <div>
            <span className="text-muted-foreground text-sm">Company:</span>
            <p className="font-medium">{jobOffer.organization.name}</p>
          </div>
          <div>
            <span className="text-muted-foreground text-sm">
              Interview Type:
            </span>
            <p className="font-medium">{jobOffer.interviewType}</p>
          </div>
          <div>
            <span className="text-muted-foreground text-sm">Duration:</span>
            <p className="font-medium">
              {jobOffer.durationMin} - {jobOffer.durationMax} minutes
            </p>
          </div>
        </div>

        <hr className="mb-6" />

        <h2 className="mb-4 text-lg font-semibold">Apply for this Position</h2>
        <p className="text-muted-foreground mb-6">
          Instead of a traditional cover letter, please complete this brief
          application. We'll follow up with next steps.
        </p>

        <InterviewForm jobOfferId={jobOfferId} />
      </div>
    </div>
  );
}
