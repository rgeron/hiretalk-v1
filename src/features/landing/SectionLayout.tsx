import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export type SectionLayoutProps = PropsWithChildren<{
  size?: "sm" | "base" | "lg";
  variant?: "default" | "card" | "primary" | "invert";
  className?: string;
}>;

export const SectionLayout = ({
  size = "base",
  variant = "default",
  className,
  children,
}: SectionLayoutProps) => {
  return (
    <div
      className={cn({
        "bg-background text-foreground": variant === "default",
        "bg-card text-card-foreground": variant === "card",
        "bg-primary text-primary-foreground": variant === "primary",
        "bg-foreground text-background": variant === "invert",
      })}
    >
      <div
        className={cn(
          "m-auto px-4 my-10 lg:my-16",
          {
            "max-w-4xl": size === "sm",
            "max-w-5xl": size === "base",
            "max-w-6xl": size === "lg",
          },
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
