import { Alert, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { getServerUrl } from "@/lib/server-url";
import { SiteConfig } from "@/site-config";
import Image from "next/image";
import { RenderProviders } from "./RenderProviders";

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
            <SignInProviders />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export const SignInProviders = async () => {
  const providers = await fetch(`${getServerUrl()}/api/auth/providers`).then(
    (res) => res.json()
  );

  if (!providers) {
    return (
      <Alert>
        <AlertTitle>
          Sorry, we are unable to sign you in at this time.
        </AlertTitle>
      </Alert>
    );
  }

  return <RenderProviders providers={providers} />;
};
