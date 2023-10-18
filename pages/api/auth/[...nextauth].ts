import { sendVerificationRequest } from '@/lib/email-auth';
import { env } from '@/lib/env';
import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    EmailProvider({
      from: 'not-used@gmail.com', // BTW : Not used
      server: 'smtp://username:password@smtp.example.com:587', // BTW : Not used
      sendVerificationRequest,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      if (!session?.user) return session;

      session.user.id = user.id;
      session.user.image = user.image;
      return session;
    },
  },
};

export default NextAuth(authOptions);
