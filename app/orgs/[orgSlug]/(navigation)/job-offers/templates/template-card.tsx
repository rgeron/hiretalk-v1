"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, FileText, MessagesSquare } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export type TemplateCardProps = {
  template: {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    questionsCount: number;
  };
  orgSlug: string;
};

export function TemplateCard({ template, orgSlug }: TemplateCardProps) {
  // Get a color based on the template name (just for visual variety)
  const colors = [
    "bg-blue-100",
    "bg-green-100",
    "bg-purple-100",
    "bg-amber-100",
    "bg-rose-100",
  ];
  const colorIndex = template.name.length % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
      <div className={cn("h-2", bgColor)} />
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-lg">{template.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground line-clamp-3 text-sm">
          {template.description || "No description provided"}
        </p>

        <div className="text-muted-foreground mt-4 flex items-center gap-2 text-xs">
          <Clock className="h-3 w-3" />
          <span>
            Created {format(new Date(template.createdAt), "MMM d, yyyy")}
          </span>
        </div>

        <div className="text-muted-foreground mt-2 flex items-center gap-2 text-xs">
          <MessagesSquare className="h-3 w-3" />
          <span>
            {template.questionsCount} question
            {template.questionsCount !== 1 ? "s" : ""}
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Link
          href={`/orgs/${orgSlug}/job-offers/templates/${template.id}`}
          className="w-full"
        >
          <Button variant="outline" size="sm" className="w-full">
            <FileText className="mr-2 h-4 w-4" />
            View Template
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
