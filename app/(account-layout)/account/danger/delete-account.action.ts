"use server";

import { ActionError, authAction } from "@/lib/actions/safe-actions";
import { sendEmail } from "@/lib/mail/sendEmail";
import { prisma } from "@/lib/prisma";
import { getServerUrl } from "@/lib/server-url";
import { deleteOrganizationQuery } from "@/query/org/org-delete.query";
import { SiteConfig } from "@/site-config";
import AccountAskDeletionEmail from "@email/AccountAskDeletion.email";
import AccountConfirmDeletionEmail from "@email/AccountConfirmDeletion.email";
import { addHours } from "date-fns";
import { nanoid } from "nanoid";
import { z } from "zod";

export const accountAskDeletionAction = authAction.action(async ({ ctx }) => {
  const userId = ctx.user.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      organizations: {
        where: {
          role: "OWNER",
        },
        select: {
          organization: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw new ActionError("You don't have an account!");
  }

  const token = await prisma.verificationToken.create({
    data: {
      identifier: `${user.email}-delete-account`,
      expires: addHours(new Date(), 1),
      data: {
        deleteAccount: true,
      },
      token: nanoid(32),
    },
  });

  await sendEmail({
    from: SiteConfig.email.from,
    subject: "[Action required] Confirm your account deletion",
    to: user.email,
    react: AccountAskDeletionEmail({
      email: user.email ?? "",
      organizationsToDelete: user.organizations?.map(
        (o) => o.organization.name,
      ),
      confirmUrl: `${getServerUrl()}/account/delete/confirm?token=${token.token}`,
    }),
  });
});

const TokenSchema = z.object({
  deleteAccount: z.boolean(),
});

export async function verifyDeleteAccountToken(token: string, userEmail: string) {
  const verificationToken = await prisma.verificationToken.findUnique({
    where: {
      token,
    },
  });

  if (!verificationToken) {
    throw new ActionError("Invalid token");
  }

  const tokenData = TokenSchema.parse(String(verificationToken.data));

  if (!tokenData.deleteAccount) {
    throw new ActionError("Invalid token");
  }

  if (verificationToken.identifier !== `${userEmail}-delete-account`) {
    throw new ActionError("Invalid token");
  }

  if (verificationToken.expires < new Date()) {
    throw new ActionError("Token expired");
  }

  return verificationToken;
}

export const orgConfirmDeletionAction = authAction
  .schema(
    z.object({
      token: z.string(),
    }),
  )
  .action(async ({ parsedInput: { token }, ctx }) => {
    await verifyDeleteAccountToken(token, ctx.user.email);

    // first delete all organizations linked to the user
    const organizationsToDelete = await prisma.organization.findMany({
      where: {
        members: {
          some: {
            userId: ctx.user.id,
            role: "OWNER",
          },
        },
      },
    });

    for await (const organization of organizationsToDelete) {
      await deleteOrganizationQuery(organization.id);
    }

    await prisma.user.delete({
      where: {
        id: ctx.user.id,
      },
    });

    await prisma.verificationToken.delete({
      where: {
        token,
      },
    });

    await sendEmail({
      from: SiteConfig.email.from,
      subject: "Your account has been deleted",
      to: ctx.user.email,
      react: AccountConfirmDeletionEmail(),
    });
  });
