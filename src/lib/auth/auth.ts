import { PrismaAdapter } from "@auth/prisma-adapter";
import type { User } from "next-auth";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { env } from "../env";
import { resend } from "../mail/resend";
import prisma from "../prisma";
import { stripe } from "../stripe";
import { getEmailProvider } from "./email-provider";

export const {
  handlers: { GET, POST },
  auth,
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
    getEmailProvider(),
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
    // signIn: credentialsSignInCallback,
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
