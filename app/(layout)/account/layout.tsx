import { Layout } from '@/components/page/layout';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

export default function AccountLayout({ children }: PropsWithChildren) {
  return (
    <Layout className="max-w-4xl flex gap-4">
      <div className="flex flex-col gap-2 border-r-2 border-accent pr-4 mt-4">
        <Typography variant="small" className="uppercase font-bold ml-2.5 text-xs">
          PERSONAL INFORMATION
        </Typography>
        <div className="flex flex-col">
          <Link
            className="px-3 py-2 hover:bg-accent w-full rounded-md text-sm"
            href="/account/edit"
          >
            Edit profile
          </Link>
          <Link
            className="px-3 py-2 hover:bg-accent w-full rounded-md text-sm"
            href="/account/delete"
          >
            Delete profile
          </Link>
        </div>
        <Typography
          variant="small"
          className="uppercase font-bold ml-2.5 py-2 text-xs mt-4"
        >
          Email settings
        </Typography>
        <div className="flex flex-col">
          <Link
            className="px-3 py-2 hover:bg-accent w-full rounded-md text-sm"
            href="/account/email"
          >
            Edit email settings
          </Link>
        </div>
      </div>
      <main className="flex-1">{children}</main>
    </Layout>
  );
}
