"use server";

import prisma from "@/lib/prisma";
import { userAction } from "@/lib/server-actions/safe-actions";
import { z } from "zod";

const ToggleSubscribedActionSchema = z.object({
  unsubscribed: z.boolean(),
});

export const toggleSubscribedAction = userAction(
  ToggleSubscribedActionSchema,
  async (data, ctx) => {
    const userId = ctx.user.id;

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        unsubscribed: data.unsubscribed,
      },
    });

    return user;
  }
);
