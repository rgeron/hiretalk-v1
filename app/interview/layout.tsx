import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "../globals.css";
import { Providers } from "../providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HireTalk - AI-Powered Interview",
  description:
    "Complete your job application with an AI-powered voice interview",
};

export default function InterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-background h-full font-sans antialiased`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <header className="bg-card/40 border-b backdrop-blur-sm">
              <div className="container flex justify-center py-3">
                <Link href="/" className="text-xl font-bold">
                  Talk2Apply
                </Link>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="bg-muted/40 border-t py-6">
              <div className="text-muted-foreground container text-center text-sm">
                <p>
                  © {new Date().getFullYear()} Talk2Apply. All rights reserved.
                </p>
                <p className="mt-1">
                  <Link href="/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                  {" · "}
                  <Link href="/terms" className="hover:underline">
                    Terms of Service
                  </Link>
                </p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
