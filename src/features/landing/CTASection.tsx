import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import { SectionLayout } from "./SectionLayout";

export type CTASectionProps = {
  backgroundImage: string;
  title: string;
  subtitle: string;
  ctaHref: string;
  ctaLabel: string;
}

export const CTASection = (props: CTASectionProps) => {
  return (
    <div
      style={{
        backgroundImage: `url(${props.backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <SectionLayout
        variant="image"
        className="flex min-h-[500px] flex-col items-center justify-center gap-4 text-white drop-shadow-md"
      >
        <Typography
          variant="h2"
          className="text-center text-5xl font-extrabold"
        >
          {props.title}
        </Typography>
        <Typography variant="base" className="text-center font-bold">
          {props.subtitle}
        </Typography>
        <Link href={props.ctaHref} className={buttonVariants({ size: "lg" })}>
          {props.ctaLabel}
        </Link>
      </SectionLayout>
    </div>
  );
};
