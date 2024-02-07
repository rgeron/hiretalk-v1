/* eslint-disable @typescript-eslint/no-unused-vars */
import { SiteConfig } from "@/site-config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import MagicLinkMail from "@email/MagicLinkEmail";
import type { Session, User } from "next-auth";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";
import { env } from "../env";
import { logger } from "../logger";
import { sendEmail } from "../mail/sendEmail";
import prisma from "../prisma";
import { setupResendCustomer, setupStripeCustomer } from "./auth-config-setup";

export const {
  handlers,
  auth,
  // TODO : Use req callback
} = NextAuth((req) => ({
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    Resend({
      apiKey: env.RESEND_API_KEY,
      sendVerificationRequest: async ({ identifier: email, url }) => {
        const result = await sendEmail({
          from: SiteConfig.email.from,
          to: email,
          subject: `Sign in to ${SiteConfig.domain}`,
          react: MagicLinkMail({
            url,
          }),
        });

        if (result.error) {
          logger.error("Auth Resend Provider Error", result.error);
          throw new Error(`Failed to send email: ${result.error}`);
        }
      },
    }),
    // 🔑 Add this line and the import to add credentials provider
    // getCredentialsProvider(),
  ],
  session: {
    strategy: "database",
  },
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    session(params) {
      if (params.newSession) return params.session;

      const typedParams = params as {
        session: Session;
        user?: User;
      };

      if (!typedParams.user?.id) return params.session;

      typedParams.session.user.id = typedParams.user.id;
      return typedParams.session;
    },
  },
  events: {
    // 🔑 Add this line and the import to add credentials provider
    // signIn: credentialsSignInCallback(req),
    createUser: async (message) => {
      const user = message.user;

      if (!user.email) {
        return;
      }

      const stripeCustomerId = await setupStripeCustomer(user);
      const resendContactId = await setupResendCustomer(user);

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          stripeCustomerId,
          resendContactId,
        },
      });
    },
  },
  // 🔑 Add this line and the import to add credentials provider
  // jwt: credentialsOverrideJwt,
}));
