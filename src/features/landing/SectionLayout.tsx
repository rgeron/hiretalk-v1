import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

export type SectionLayoutProps = PropsWithChildren<{
  size?: "sm" | "base" | "lg";
  spacing?: "sm" | "base" | "lg";
  variant?: "default" | "card" | "primary" | "invert" | "image";
  className?: string;
  containerClassName?: string;
}>;

export const SectionLayout = ({
  size = "base",
  spacing = "base",
  variant = "default",
  className,
  containerClassName,
  children,
}: SectionLayoutProps) => {
  return (
    <div
      className={cn(
        {
          "bg-background text-foreground": variant === "default",
          "bg-card text-card-foreground": variant === "card",
          "bg-primary text-primary-foreground": variant === "primary",
          "bg-foreground text-background": variant === "invert",
          "text-foreground backdrop-blur-sm backdrop-brightness-75":
            variant === "image",
        },
        containerClassName
      )}
    >
      <div
        className={cn(
          "m-auto px-4",
          {
            "max-w-4xl": size === "sm",
            "max-w-5xl": size === "base",
            "max-w-6xl": size === "lg",
          },
          {
            "py-4 lg:py-8": spacing === "sm",
            "py-20 lg:py-28": spacing === "base",
            "py-32 lg:py-40": spacing === "lg",
          },
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
