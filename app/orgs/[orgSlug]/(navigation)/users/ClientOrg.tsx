"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCurrentOrg } from "../../useCurrentOrg";

export const ClientOrg = () => {
  const org = useCurrentOrg();

  if (!org) {
    return (
      <Card>
        <CardHeader>No org</CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{org.name}</CardTitle>
        <CardDescription>{org.slug}</CardDescription>
      </CardHeader>
    </Card>
  );
};
