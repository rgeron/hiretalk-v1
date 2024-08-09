"use client";

import { Toaster } from "@/components/ui/sonner";
import { DialogRenderer } from "@/features/dialogs-provider/DialogProvider";
import { GlobalDialogLazy } from "@/features/global-dialog/GlobalDialogLazy";
import { SearchParamsMessageToastSuspended } from "@/features/searchparams-message/SearchParamsMessageToast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <DialogRenderer />
          <GlobalDialogLazy />
          <SearchParamsMessageToastSuspended />
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};
