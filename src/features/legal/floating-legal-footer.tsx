import { SiteConfig } from "@/site-config";
import Image from "next/image";
import Link from "next/link";

export const FloatingLegalFooter = () => {
  return (
    <div className="fixed right-2 bottom-2 flex items-center gap-2">
      <Link
        className="text-muted-foreground text-xs hover:underline"
        href="/legal/privacy"
      >
        Privacy
      </Link>
      <Link
        className="text-muted-foreground text-xs hover:underline"
        href="/legal/terms"
      >
        Terms
      </Link>
      <Image src={SiteConfig.appIcon} width={12} height={12} alt="app icon" />
    </div>
  );
};
