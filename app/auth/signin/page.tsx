import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { SiteConfig } from "@/site-config";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { SignInProviders } from "./SignInProviders";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { HeaderBase } from "@/features/layout/HeaderBase";

export default async function AuthSignInPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex h-full flex-col">
      <HeaderBase />
      <div className="flex flex-1 items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col items-center justify-center">
            <CardTitle>Sign in</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Loader />}>
              <SignInProviders />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
