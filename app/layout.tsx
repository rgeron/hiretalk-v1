import { TailwindIndicator } from "@/components/utils/TailwindIndicator";
import { FloatingLegalFooter } from "@/features/legal/FloatingLegalFooter";
import { cn } from "@/lib/utils";
import { SiteConfig } from "@/site-config";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";
import "./globals.css";
import { Providers } from "./providers";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <html lang="en" className="h-full" suppressHydrationWarning>
        <head>
          <PlausibleProvider domain={SiteConfig.domain} />
        </head>
        <body
          className={cn(
            "h-full bg-background font-sans antialiased",
            fontSans.variable,
            GeistMono.className,
            GeistSans.className
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
