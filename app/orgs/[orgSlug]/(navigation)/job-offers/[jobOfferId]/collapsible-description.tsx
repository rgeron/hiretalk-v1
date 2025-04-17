"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function CollapsibleDescription({
  description,
}: {
  description: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get first 3 lines or approximately 180 characters
  const truncated = description.split("\n").slice(0, 3).join("\n");
  const isTruncated = description.length > truncated.length;

  return (
    <div className="w-full">
      <div className={isExpanded ? "" : "line-clamp-3"}>{description}</div>

      {isTruncated && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-1 h-8 px-2 text-xs"
        >
          {isExpanded ? (
            <>
              Hide <ChevronUp className="ml-1 h-3 w-3" />
            </>
          ) : (
            <>
              Show more <ChevronDown className="ml-1 h-3 w-3" />
            </>
          )}
        </Button>
      )}
    </div>
  );
}
