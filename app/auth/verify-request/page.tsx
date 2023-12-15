import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { SiteConfig } from '@/site-config';
import Image from 'next/image';

export default async function AuthNewUserPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return (
    <div className="h-full">
      <header className="flex items-center gap-2 pt-4 px-4">
        <Image src={SiteConfig.appIcon} alt="app icon" width={32} height={32} />
        <Typography variant="h2">{SiteConfig.title}</Typography>
      </header>
      <div className="h-full flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Almost There!</CardTitle>
            <CardDescription>
              To complete the verification, head over to your email inbox. You'll
              find a magic link from us. Click on it, and you're all set!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Typography variant="muted">
              Email sent to {searchParams.email}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
