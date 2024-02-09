import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

export type SectionLayoutProps = {
  size?: "sm" | "base" | "lg";
  variant?: "default" | "card" | "primary" | "invert" | "image";
  className?: string;
  containerClassName?: string;
} & ComponentPropsWithoutRef<"div">;

export const SectionLayout = ({
  size = "base",
  variant = "default",
  className,
  containerClassName,
  children,
  ...props
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
      {...props}
    >
      <div
        className={cn(
          "m-auto px-4 py-20 lg:py-28",
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
