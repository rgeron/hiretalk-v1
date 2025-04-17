"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export function CopyLinkButton({ jobOfferId }: { jobOfferId: string }) {
  const [copying, setCopying] = useState(false);

  const handleCopyLink = async () => {
    setCopying(true);

    // Generate the interview URL
    const baseUrl = window.location.origin;
    const interviewUrl = `${baseUrl}/interview/${jobOfferId}`;

    try {
      await navigator.clipboard.writeText(interviewUrl);
      toast.success("Interview link copied to clipboard");
    } catch {
      toast.error("Failed to copy link");
    } finally {
      setCopying(false);
    }
  };

  return (
    <Button onClick={handleCopyLink} disabled={copying} className="mt-4">
      {copying ? "Copying..." : "Get Invitation Link"}
    </Button>
  );
}
