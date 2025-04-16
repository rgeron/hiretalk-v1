import { getInterviewQuestions } from "@/lib/questions";
import { JobOfferForm } from "./job-offer-form";

export async function InterviewQuestionsProvider({
  orgSlug,
}: {
  orgSlug: string;
}) {
  // Fetch questions from our utility function
  const questionCategories = await getInterviewQuestions();

  return (
    <JobOfferForm orgSlug={orgSlug} questionCategories={questionCategories} />
  );
}
