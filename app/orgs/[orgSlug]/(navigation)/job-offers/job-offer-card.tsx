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
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar, Clock, Users } from "lucide-react";
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
      <div
        className={cn(
          "h-2",
          jobOffer.status.toLowerCase() === "ongoing"
            ? "bg-blue-500"
            : jobOffer.status.toLowerCase() === "closed"
              ? "bg-gray-500"
              : "bg-green-500",
        )}
      />
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

        <div className="space-y-2">
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <Users className="h-3 w-3" />
            <span>
              {jobOffer.applicationCount ?? 0} application
              {jobOffer.applicationCount !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <Clock className="h-3 w-3" />
            <span>
              {getDurationText(jobOffer.durationMin, jobOffer.durationMax)}{" "}
              interview
            </span>
          </div>

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
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
