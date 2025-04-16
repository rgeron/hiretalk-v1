"use client";

import { Button } from "@/components/ui/button";
import { dialogManager } from "@/features/dialog-manager/dialog-manager-store";
import { resolveActionResult } from "@/lib/actions/actions-utils";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import {
  closeJobOfferAction,
  deleteJobOfferAction,
  launchJobOfferAction,
} from "./job-offer-actions.action";

type ActionButtonProps = {
  label: string;
  href?: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  icon?: React.ReactNode;
  dialogOptions: {
    title: string;
    description: string;
    confirmText?: string;
    actionLabel: string;
    actionType: "launch" | "close" | "delete";
    jobOfferId: string;
  };
};

export function ActionButton({
  label,
  href,
  variant = "default",
  icon,
  dialogOptions,
}: ActionButtonProps) {
  const router = useRouter();

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

  const handleClick = () => {
    dialogManager.add({
      title: dialogOptions.title,
      description: dialogOptions.description,
      confirmText: dialogOptions.confirmText,
      action: {
        label: dialogOptions.actionLabel,
        onClick: async () => {
          const { actionType, jobOfferId } = dialogOptions;

          // Call the appropriate mutation based on action type
          switch (actionType) {
            case "launch":
              launchMutation.mutate(jobOfferId);
              break;
            case "close":
              closeMutation.mutate(jobOfferId);
              break;
            case "delete":
              deleteMutation.mutate(jobOfferId);
              break;
          }
        },
      },
    });
  };

  return (
    <Button variant={variant} onClick={handleClick} asChild={!!href}>
      {href ? (
        <Link href={href}>
          {icon}
          {label}
        </Link>
      ) : (
        <>
          {icon}
          {label}
        </>
      )}
    </Button>
  );
}
