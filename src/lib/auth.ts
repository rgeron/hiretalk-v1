import { SiteConfig } from '@/site-config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import {
  EmailConfig,
  SendVerificationRequestParams,
} from 'next-auth/providers/email';
import GitHub from 'next-auth/providers/github';
import MagicLinkMail from '../../emails/MagicLinkMail';
import { env } from './env';
import prisma from './prisma';
import { sendEmail } from './resend';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    {
      id: 'email' as any,
      server: '',
      from: '',
      maxAge: 0,
      name: 'Email',
      options: {},
      type: 'email' as const,
      sendVerificationRequest: (async ({
        identifier: email,
        url,
      }: SendVerificationRequestParams) => {
        const result = await sendEmail({
          from: SiteConfig.email.from,
          to: email,
          subject: `Sign in to ${SiteConfig.domain}`,
          react: MagicLinkMail({
            url,
          }),
        });

        if (result.error) {
          throw new Error(`Failed to send email: ${result.error}`);
        }

        return result;
      }) as any,
    } as EmailConfig,
  ],
  callbacks: {
    session({ session, user }) {
      if (!session?.user) return session;
      session.user.id = user.id;
      return session;
    },
  },
});

export const requiredAuth = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error('You must be authenticated to access this resource.');
  }

  return session as Required<typeof session>;
};
