"use server";

import { setupStripeCustomer } from "@/lib/auth/auth";
import { hashStringWithSalt } from "@/lib/auth/credentials-provider";
import { env } from "@/lib/env";
import prisma from "@/lib/prisma";
import { ActionError, action } from "@/lib/server-actions/safe-actions";
import { LoginCredentialsFormScheme } from "./signup.schema";

export const signUpAction = action(
  LoginCredentialsFormScheme,
  async ({ email, password, name }) => {
    try {
      const user = await prisma.user.create({
        data: {
          email,
          passwordHash: hashStringWithSalt(password, env.NEXTAUTH_SECRET),
          name,
        },
      });

      await setupStripeCustomer(user);

      return user;
    } catch {
      throw new ActionError("Email already exists");
    }
  }
);
