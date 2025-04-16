"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Briefcase, Users } from "lucide-react";
import Link from "next/link";

type JobOfferTabsProps = {
  orgSlug: string;
  jobOfferId: string;
  activeTab: "job-offer" | "applications" | "data";
};

export function JobOfferTabs({
  orgSlug,
  jobOfferId,
  activeTab,
}: JobOfferTabsProps) {
  const tabs = [
    {
      id: "job-offer",
      label: "Job Offer",
      icon: <Briefcase className="h-4 w-4" />,
      href: `/orgs/${orgSlug}/job-offers/${jobOfferId}`,
    },
    {
      id: "applications",
      label: "Applications",
      icon: <Users className="h-4 w-4" />,
      href: `/orgs/${orgSlug}/job-offers/${jobOfferId}/applications`,
    },
    {
      id: "data",
      label: "Data",
      icon: <BarChart className="h-4 w-4" />,
      href: `/orgs/${orgSlug}/job-offers/${jobOfferId}/data`,
    },
  ];

  return (
    <Tabs defaultValue={activeTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            asChild
            className="flex items-center gap-2"
          >
            <Link href={tab.href}>
              {tab.icon}
              {tab.label}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
