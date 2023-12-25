import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requiredAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ToggleEmailCheckbox } from "./ToggleEmailCheckbox";
import { Skeleton } from "@/components/ui/skeleton";

export default function PageLoading() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mail settings</CardTitle>
        <CardDescription>
          Update your email notifications settings to match your preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-12 w-full" />
      </CardContent>
    </Card>
  );
}
