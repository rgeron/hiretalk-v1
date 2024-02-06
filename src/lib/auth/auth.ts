/* eslint-disable @typescript-eslint/no-unused-vars */
import { SiteConfig } from "@/site-config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import MagicLinkMail from "@email/MagicLinkEmail";
import type { User } from "next-auth";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
// import Resend from "next-auth/providers/resend";
import { env } from "../env";
import { resend } from "../mail/resend";
import { sendEmail } from "../mail/sendEmail";
import prisma from "../prisma";
import { stripe } from "../stripe";
import TempResendAdapater from "./TempResendAdapter";

export const {
  handlers: { GET, POST },
  auth,
  // TODO : Use req callback
} = NextAuth({
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    TempResendAdapater({
      apiKey: env.RESEND_API_KEY,
      sendVerificationRequest: async ({ identifier: email, url }) => {
        const result = await sendEmail({
          to: email,
          subject: `Sign in to ${SiteConfig.domain}`,
          react: MagicLinkMail({
            url,
          }),
        });

        if (result.error) {
          throw new Error(`Failed to send email: ${result.error}`);
        }
      },
    }) as never,
    // 🔑 Add this line and the import to add credentials provider
    // getCredentialsProvider(),
  ],
  callbacks: {
    session({ session, user }) {
      if (!session?.user) return session;
      session.user.id = user.id;
      return session;
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
});

export const setupStripeCustomer = async (user: User) => {
  if (!user.email) {
    return;
  }

  const customer = await stripe.customers.create({
    email: user.email,
    name: user.name ?? undefined,
  });

  return customer.id;
};

export const setupResendCustomer = async (user: User) => {
  if (!user.email) {
    return;
  }

  if (!env.RESEND_AUDIENCE_ID) {
    return;
  }

  const contact = await resend.contacts.create({
    audienceId: env.RESEND_AUDIENCE_ID,
    email: user.email,
    firstName: user.name ?? "",
    unsubscribed: false,
  });

  if (!contact.data) return;

  return contact.data.id;
};
