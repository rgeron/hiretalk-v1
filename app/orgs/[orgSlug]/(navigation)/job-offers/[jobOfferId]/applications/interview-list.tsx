import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { resolveActionResult } from "@/lib/actions/actions-utils";
import { formatDate } from "@/lib/utils";
import { ExternalLink, FileText, Headphones } from "lucide-react";
import Link from "next/link";
import { getInterviewsForJobAction } from "./interviews.action";

type Interview = {
  id: string;
  candidateName: string;
  candidateEmail: string;
  cvUrl: string | null;
  recordingUrl: string | null;
  status: string;
  createdAt: Date;
  completedAt: Date | null;
  overallScore: number | null;
  recommendation: string | null;
  isReviewed: boolean;
};

export async function InterviewList({
  jobOfferId,
  orgSlug,
}: {
  jobOfferId: string;
  orgSlug: string;
}) {
  // Fetch interviews for this job offer
  const interviews = await resolveActionResult(
    getInterviewsForJobAction({ jobOfferId }),
  );

  if (!interviews.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-lg font-medium">No applications yet</h3>
        <p className="text-muted-foreground mt-1 max-w-md">
          Share your job offer link with candidates to start receiving
          applications.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Candidate</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Applied</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Recommendation</TableHead>
          <TableHead>Documents</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {interviews.map((interview) => (
          <TableRow key={interview.id}>
            <TableCell>
              <div>
                <div className="font-medium">{interview.candidateName}</div>
                <div className="text-muted-foreground text-sm">
                  {interview.candidateEmail}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <StatusBadge status={interview.status} />
            </TableCell>
            <TableCell>{formatDate(interview.createdAt)}</TableCell>
            <TableCell>
              {interview.overallScore ? (
                <span className="font-medium">
                  {Math.round(interview.overallScore * 100)}%
                </span>
              ) : (
                <span className="text-muted-foreground text-sm">N/A</span>
              )}
            </TableCell>
            <TableCell>
              {interview.recommendation ? (
                <span>{interview.recommendation}</span>
              ) : (
                <span className="text-muted-foreground text-sm">Pending</span>
              )}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                {interview.cvUrl && (
                  <Button variant="outline" size="icon" asChild title="View CV">
                    <Link href={interview.cvUrl} target="_blank">
                      <FileText className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
                {interview.recordingUrl && (
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    title="Listen to recording"
                  >
                    <Link href={interview.recordingUrl} target="_blank">
                      <Headphones className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm" asChild>
                <Link
                  href={`/orgs/${orgSlug}/job-offers/${jobOfferId}/applications/${interview.id}`}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "completed":
      return <Badge variant="success">Completed</Badge>;
    case "active":
      return <Badge variant="warning">In Progress</Badge>;
    case "pending":
      return <Badge variant="secondary">Pending</Badge>;
    case "failed":
      return <Badge variant="destructive">Failed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
