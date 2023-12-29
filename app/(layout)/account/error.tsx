"use client";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { logger } from "@/lib/logger";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error(error);
  }, [error]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Sorry, something went wrong. Please try again later.
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <Button onClick={reset}>Try again</Button>
      </CardFooter>
    </Card>
  );
}
