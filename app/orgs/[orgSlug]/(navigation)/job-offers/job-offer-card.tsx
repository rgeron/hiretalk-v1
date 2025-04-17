"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dialogManager } from "@/features/dialog-manager/dialog-manager-store";
import { resolveActionResult } from "@/lib/actions/actions-utils";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { Bot, Calendar, Clock, MessageSquare, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  closeJobOfferAction,
  deleteJobOfferAction,
  launchJobOfferAction,
} from "../job-offers/[jobOfferId]/job-offer-actions.action";
import type { JobOfferSchemaType } from "./job-offer.schema";

type JobOfferCardProps = {
  jobOffer: JobOfferSchemaType;
  orgSlug: string;
};

export function JobOfferCard({ jobOffer, orgSlug }: JobOfferCardProps) {
  const router = useRouter();

  // Get duration text
  const getDurationText = (min: number, max: number) => {
    if (min === max) return `${min} minutes`;
    return `${min}-${max} minutes`;
  };

  // Launch mutation
  const launchMutation = useMutation({
    mutationFn: async (jobOfferId: string) => {
      return resolveActionResult(launchJobOfferAction({ jobOfferId }));
    },
    onSuccess: () => {
      toast.success("Job offer launched successfully");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Close mutation
  const closeMutation = useMutation({
    mutationFn: async (jobOfferId: string) => {
      return resolveActionResult(closeJobOfferAction({ jobOfferId }));
    },
    onSuccess: () => {
      toast.success("Job offer closed successfully");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (jobOfferId: string) => {
      return resolveActionResult(deleteJobOfferAction({ jobOfferId }));
    },
    onSuccess: () => {
      toast.success("Job offer deleted successfully");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Handle status change based on current status
  const handleStatusChange = () => {
    const status = jobOffer.status.toLowerCase();

    if (status === "to be launched") {
      dialogManager.add({
        title: "Launch Hiring Process",
        description:
          "Are you sure you want to launch this job offer? Once launched, candidates will be able to apply.",
        action: {
          label: "Launch",
          onClick: async () => {
            launchMutation.mutate(jobOffer.id);
          },
        },
      });
    } else if (status === "ongoing") {
      dialogManager.add({
        title: "Close Job Offer",
        description:
          "Are you sure you want to close this job offer? Candidates will no longer be able to apply once closed.",
        action: {
          label: "Close",
          onClick: async () => {
            closeMutation.mutate(jobOffer.id);
          },
        },
      });
    } else if (status === "closed") {
      dialogManager.add({
        title: "Delete Job Offer",
        description:
          "Are you sure you want to delete this job offer? This action cannot be undone.",
        confirmText: "DELETE",
        action: {
          label: "Delete",
          onClick: async () => {
            deleteMutation.mutate(jobOffer.id);
          },
        },
      });
    }
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-1 text-lg">
            {jobOffer.name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
          {jobOffer.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="border-stone-300 bg-stone-100 text-stone-800 hover:bg-stone-200"
          >
            <Clock className="mr-1 h-3 w-3" />
            {getDurationText(jobOffer.durationMin, jobOffer.durationMax)}
          </Badge>

          <Badge
            variant="outline"
            className="border-amber-200 bg-amber-100 text-amber-900 hover:bg-amber-200"
          >
            <MessageSquare className="mr-1 h-3 w-3" />
            {jobOffer.interviewType}
          </Badge>

          <Badge
            variant="outline"
            className="border-yellow-200 bg-yellow-50 text-yellow-800 hover:bg-yellow-100"
          >
            <Bot className="mr-1 h-3 w-3" />
            {jobOffer.interviewerStyle}
          </Badge>

          <Badge
            variant="outline"
            className="border-orange-200 bg-orange-50 text-orange-800 hover:bg-orange-100"
          >
            <MessageSquare className="mr-1 h-3 w-3" />
            {5} questions
          </Badge>

          <Badge
            variant="outline"
            className="border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100"
          >
            <Users className="mr-1 h-3 w-3" />
            {jobOffer.applicationCount ?? 0} application
            {jobOffer.applicationCount !== 1 ? "s" : ""}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <Calendar className="h-3 w-3" />
            <span>
              Created {format(new Date(jobOffer.createdAt), "MMM d, yyyy")}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Link
          href={`/orgs/${orgSlug}/job-offers/${jobOffer.id}`}
          className="w-full"
        >
          <Button variant="outline" size="sm" className="w-full">
            Manage your job offer
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
