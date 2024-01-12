import { TailwindIndicator } from "@/components/utils/TailwindIndicator";
import { FloatingLegalFooter } from "@/features/legal/FloatingLegalFooter";
import { cn } from "@/lib/utils";
import { SiteConfig } from "@/site-config";
import type { LayoutParams } from "@/types/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import "./code-theme.scss";
import "./globals.scss";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
};

export default function RootLayout({ children }: LayoutParams<{}>) {
  return (
    <>
      <html lang="en" className="h-full" suppressHydrationWarning>
        <head>
          <PlausibleProvider domain={SiteConfig.domain} />
        </head>
        <body
          className={cn(
            "h-full bg-background font-sans antialiased",
            GeistMono.variable,
            GeistSans.variable
          )}
        >
          <Providers>
            {children}
            <TailwindIndicator />
            <FloatingLegalFooter />
          </Providers>
        </body>
      </html>
    </>
  );
}
