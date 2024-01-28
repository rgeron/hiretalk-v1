import { AsyncLocalStorage } from "async_hooks";
import crypto from "crypto";
import { nanoid } from "nanoid";
import type NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { env } from "../env";
import { logger } from "../logger";
import prisma from "../prisma";
import { nextRequestHeader } from "./auth-next-request-store";

export const nextRequestStorage = new AsyncLocalStorage();

export const hashStringWithSalt = (string: string, salt: string) => {
  const hash = crypto.createHash("sha256");

  const saltedString = salt + string;

  hash.update(saltedString);

  const hashedString = hash.digest("hex");

  return hashedString;
};

export const getCredentialsProvider = () => {
  return CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "text", placeholder: "Your email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      logger.debug("Authroize user");
      if (!credentials || !credentials.email || !credentials.password)
        return null;

      // Add logic here to look up the user from the credentials supplied
      const passwordHash = hashStringWithSalt(
        String(credentials.password),
        env.NEXTAUTH_SECRET
      );

      logger.debug("passwordHash", passwordHash);

      const user = await prisma.user.findFirst({
        where: {
          email: credentials.email,
          passwordHash: passwordHash,
        },
      });

      logger.debug("user", user);

      if (user) {
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      } else {
        return null;
      }
    },
  });
};

const tokenName =
  env.NODE_ENV === "development"
    ? "authjs.session-token"
    : "__Secure-next-auth.session-token";

type SignInCallback = NonNullable<
  Parameters<typeof NextAuth>[0]["events"]
>["signIn"];

type JwtOverride = NonNullable<Parameters<typeof NextAuth>[0]["jwt"]>;

export const credentialsSignInCallback: SignInCallback = async ({ user }) => {
  const request = nextRequestHeader();

  if (!request) {
    return;
  }

  if (request.method !== "POST") {
    return;
  }

  const currentUrl = request.url;

  if (!currentUrl?.includes("credentials")) {
    return;
  }

  if (!currentUrl?.includes("callback")) {
    return;
  }

  if (!user) {
    return;
  }

  const uuid = nanoid();
  // + 7 days
  const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await prisma.session.create({
    data: {
      sessionToken: uuid,
      userId: user.id,
      // expires in 2 weeks
      expires: expireAt,
    },
  });

  logger.debug({ uuid });

  const cookieList = cookies();

  cookieList.set(tokenName, uuid, {
    expires: expireAt,
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secure: env.NODE_ENV === "production",
  });

  return;
};

// This override cancel JWT strategy for password. (it's the default one)
export const credentialsOverrideJwt: JwtOverride = {
  encode(params) {
    return "";
  },
  async decode(params) {
    return null;
  },
};
