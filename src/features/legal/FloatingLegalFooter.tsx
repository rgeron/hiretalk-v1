// TODO : S'inspirer du floater de v0.dev pour faire celui-ci

import { SiteConfig } from '@/site-config';
import Image from 'next/image';
import Link from 'next/link';

export const FloatingLegalFooter = () => {
  return (
    <div className="absolute items-center bottom-2 right-2 flex gap-2">
      <Link
        className="text-xs text-muted-foreground hover:underline"
        href="/legal/privacy"
      >
        Privacy
      </Link>
      <Link
        className="text-xs text-muted-foreground hover:underline"
        href="/legal/terms"
      >
        Terms
      </Link>
      <Image src={SiteConfig.appIcon} width={12} height={12} alt="app icon" />
    </div>
  );
};
