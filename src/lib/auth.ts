import { SiteConfig } from "@/site-config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import {
  EmailConfig,
  SendVerificationRequestParams,
} from "next-auth/providers/email";
import GitHub from "next-auth/providers/github";
import MagicLinkMail from "../../emails/MagicLinkEmail";
import { env } from "./env";
import prisma from "./prisma";
import { sendEmail } from "./resend";
import { stripe } from "./stripe";

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
    {
      id: "email" as never,
      server: "",
      from: "",
      maxAge: 0,
      name: "Email",
      options: {},
      type: "email" as const,
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
      }) as never,
    } as EmailConfig,
  ],
  callbacks: {
    session({ session, user }) {
      if (!session?.user) return session;
      session.user.id = user.id;
      return session;
    },
  },
  events: {
    createUser: async (message) => {
      const user = message.user;

      if (!user.email) {
        return;
      }

      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name ?? undefined,
      });

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          stripeCustomerId: customer.id,
        },
      });
    },
  },
});

export const requiredAuth = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be authenticated to access this resource.");
  }

  return session as Required<typeof session>;
};

export const requiredFullAuth = async () => {
  const session = await requiredAuth();

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: session.user.id,
    },
  });

  return user;
};
