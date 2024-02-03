"use server";

import prisma from "@/lib/prisma";
import { userAction } from "@/lib/server-actions/safe-actions";
import { ProfileFormSchema } from "./edit-profile.schema";

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
