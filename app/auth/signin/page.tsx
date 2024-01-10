import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { Typography } from "@/components/ui/typography";
import { SiteConfig } from "@/site-config";
import Image from "next/image";
import { Suspense } from "react";
import { SignInProviders } from "./SignInProviders";

export default async function AuthNewUserPage() {
  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-2 px-4 pt-4">
        <Image src={SiteConfig.appIcon} alt="app icon" width={32} height={32} />
        <Typography variant="h2">{SiteConfig.title}</Typography>
      </header>
      <div className="flex flex-1 items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
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
