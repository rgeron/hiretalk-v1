"use server";

import {
  hashStringWithSalt,
  validatePassword,
} from "@/lib/auth/credentials-provider";
import { requiredFullAuth } from "@/lib/auth/helper";
import { env } from "@/lib/env";
import prisma from "@/lib/prisma";
import { ActionError, userAction } from "@/lib/server-actions/safe-actions";
import {
  EditPasswordFormSchema,
  ProfileFormSchema,
} from "./edit-profile.schema";

export const updateProfileAction = userAction(
  ProfileFormSchema,
  async (input, ctx) => {
    const user = await prisma.user.update({
      where: {
        id: ctx.user.id,
      },
      data: input,
    });

    return user;
  }
);

export const editPasswordAction = userAction(
  EditPasswordFormSchema,
  async (input, ctx) => {
    const session = await requiredFullAuth();

    if (input.newPassword !== input.confirmPassword) {
      throw new ActionError("Passwords do not match");
    }

    if (
      hashStringWithSalt(input.currentPassword, env.NEXTAUTH_SECRET) !==
      session.passwordHash
    ) {
      throw new ActionError("Invalid current password");
    }

    if (validatePassword(input.newPassword)) {
      throw new ActionError(
        "Invalid new password. Must be at least 8 characters, and contain at least one letter and one number"
      );
    }

    const user = await prisma.user.update({
      where: {
        id: ctx.user.id,
      },
      data: {
        passwordHash: hashStringWithSalt(
          input.newPassword,
          env.NEXTAUTH_SECRET
        ),
      },
    });

    return user;
  }
);
