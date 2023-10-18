import { Typography } from '@/components/ui/typography';
import { SiteConfig } from '@/site-config';
import Image from 'next/image';
import Link from 'next/link';
import { AuthButton } from '../auth/HeaderAuthButton';
import { ThemeToggle } from '../theme/ThemeToggle';

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-2">
          <Image src={SiteConfig.appIcon} alt="app logo" width={32} height={32} />
          <Typography variant="h3" as={Link} href="/">
            {SiteConfig.title}
          </Typography>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <AuthButton />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
