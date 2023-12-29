import { Typography } from "@/components/ui/typography";
import { SectionLayout } from "../landing/SectionLayout";
import { PricingCard, type PricingCardProps } from "./PricingCard";

export type PricingProps = {
  cards: PricingCardProps[];
};

export const Pricing = (props: PricingProps) => {
  return (
    <SectionLayout
      size="lg"
      className="flex w-full flex-col items-center gap-16"
    >
      <div className="space-y-2 text-center">
        <Typography
          variant="small"
          className="font-extrabold uppercase text-primary"
        >
          Pricing
        </Typography>
        <Typography variant="h2">
          Stop wasting time, start building your app today
        </Typography>
      </div>
      <div className="flex w-full justify-center gap-4 max-md:flex-col">
        {props.cards.map((card, i) => (
          <PricingCard key={i} {...card} />
        ))}
      </div>
    </SectionLayout>
  );
};
