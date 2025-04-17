"use client";

import { Badge } from "@/components/ui/badge";
import { dialogManager } from "@/features/dialog-manager/dialog-manager-store";
import { resolveActionResult } from "@/lib/actions/actions-utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  closeJobOfferAction,
  deleteJobOfferAction,
  launchJobOfferAction,
} from "./job-offer-actions.action";

type InteractiveStatusBadgeProps = {
  status: string;
  jobOfferId: string;
};

export function InteractiveStatusBadge({
  status,
  jobOfferId,
}: InteractiveStatusBadgeProps) {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);

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

  // Get next status label based on current status
  const getNextStatusLabel = (currentStatus: string) => {
    switch (currentStatus.toLowerCase()) {
      case "to be launched":
        return "Launch";
      case "ongoing":
        return "Close";
      case "closed":
        return "Delete";
      default:
        return "Change Status";
    }
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
    onSuccess: (result) => {
      toast.success("Job offer deleted successfully");
      if (result.redirect) {
        // Redirect to job offers list
        const orgSlug = window.location.pathname.split("/")[2];
        router.push(`/orgs/${orgSlug}/job-offers`);
      } else {
        router.refresh();
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Handle status change based on current status
  const handleStatusChange = () => {
    const currentStatus = status.toLowerCase();

    if (currentStatus === "to be launched") {
      dialogManager.add({
        title: "Launch Hiring Process",
        description:
          "Are you sure you want to launch this job offer? Once launched, candidates will be able to apply.",
        action: {
          label: "Launch",
          onClick: async () => {
            launchMutation.mutate(jobOfferId);
          },
        },
      });
    } else if (currentStatus === "ongoing") {
      dialogManager.add({
        title: "Close Job Offer",
        description:
          "Are you sure you want to close this job offer? Candidates will no longer be able to apply once closed.",
        action: {
          label: "Close",
          onClick: async () => {
            closeMutation.mutate(jobOfferId);
          },
        },
      });
    } else if (currentStatus === "closed") {
      dialogManager.add({
        title: "Delete Job Offer",
        description:
          "Are you sure you want to delete this job offer? This action cannot be undone.",
        confirmText: "DELETE",
        action: {
          label: "Delete",
          onClick: async () => {
            deleteMutation.mutate(jobOfferId);
          },
        },
      });
    }
  };

  return (
    <Badge
      variant={getBadgeVariant(status)}
      className="cursor-pointer px-3 py-1 text-sm transition-all duration-500 hover:scale-110 hover:shadow-md"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleStatusChange}
      style={{
        backgroundColor: isHovering
          ? status.toLowerCase() === "to be launched"
            ? "#f0f9ff"
            : status.toLowerCase() === "ongoing"
              ? "#dcfce7"
              : status.toLowerCase() === "closed"
                ? "#fef3c7"
                : ""
          : "",
        borderColor: isHovering
          ? status.toLowerCase() === "to be launched"
            ? "#7dd3fc"
            : status.toLowerCase() === "ongoing"
              ? "#86efac"
              : status.toLowerCase() === "closed"
                ? "#fcd34d"
                : ""
          : "",
        color: isHovering
          ? status.toLowerCase() === "to be launched"
            ? "#0369a1"
            : status.toLowerCase() === "ongoing"
              ? "#15803d"
              : status.toLowerCase() === "closed"
                ? "#b45309"
                : ""
          : "",
      }}
    >
      {isHovering ? getNextStatusLabel(status) : status}
    </Badge>
  );
}
