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
import { format } from "date-fns";
import { Bot, Calendar, Clock, MessageSquare, Users } from "lucide-react";
import Link from "next/link";
import type { JobOfferSchemaType } from "./job-offer.schema";

type JobOfferCardProps = {
  jobOffer: JobOfferSchemaType;
  orgSlug: string;
};

export function JobOfferCard({ jobOffer, orgSlug }: JobOfferCardProps) {
  // Define badge colors based on status
  const getBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "to be launched":
        return "outline";
      case "ongoing":
        return "default";
      case "closed":
        return "secondary";
      default:
        return "outline";
    }
  };

  // Get duration text
  const getDurationText = (min: number, max: number) => {
    if (min === max) return `${min} minutes`;
    return `${min}-${max} minutes`;
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-1 text-lg">
            {jobOffer.name}
          </CardTitle>
          <Badge variant={getBadgeVariant(jobOffer.status)}>
            {jobOffer.status}
          </Badge>
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
