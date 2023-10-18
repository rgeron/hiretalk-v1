import { TailwindIndicator } from '@/components/utils/TailwindIndicator';
import { Header } from '@/features/layout/Header';
import { cn } from '@/lib/utils';
import { SiteConfig } from '@/site-config';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';
import './globals.css';
import { Providers } from './providers';

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <html lang="en" className="h-full" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'h-full bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <div className="flex-1">{children}</div>
            </div>
            <TailwindIndicator />
          </Providers>
        </body>
      </html>
    </>
  );
}
