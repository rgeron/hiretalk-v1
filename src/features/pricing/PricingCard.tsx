"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export type PricingCardProps = {
  isPopular?: boolean;
  type: "monthly" | "yearly" | "one-time";
  id: string;
  title: string;
  subtitle: string;
  price: number;
  barredPrice?: number;
  currency?: string;
  features: string[];
  cta: string;
  ctaSubtitle: string;
  ctaAction?: (id: string) => void;
};

export const PricingCard = (props: PricingCardProps) => {
  return (
    <Card
      className={cn("h-fit max-w-md flex-1 relative", {
        "border-primary": props.isPopular,
      })}
    >
      {props.isPopular ? (
        <div className="absolute inset-x-0 top-0 flex items-center justify-center">
          <Badge className="-translate-y-1/2">Popular</Badge>
        </div>
      ) : null}
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-end gap-2">
          {props.barredPrice ? (
            <Typography variant="base" className="line-through">
              {props.barredPrice}
            </Typography>
          ) : null}
          <Typography variant="h2">{props.price}</Typography>
          <Typography variant="base">{props.currency ?? "USD"}</Typography>
        </div>
        <ul>
          {props.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-1">
              <Check className="text-green-500" />
              <Typography variant="base">{feature}</Typography>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-2">
        <Button onClick={() => props.ctaAction?.(props.id)}>{props.cta}</Button>
        <Typography variant="muted">{props.ctaSubtitle}</Typography>
      </CardFooter>
    </Card>
  );
};
