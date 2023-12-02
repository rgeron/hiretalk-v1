'use server';

import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/resend';
import { ActionError, userAction } from '@/lib/safe-actions';
import { SiteConfig } from '@/site-config';
import { z } from 'zod';
import DeleteAccountEmail from '../../../emails/DeleteAccountEmail';

export const deleteAccountAction = userAction(z.any(), async (_, ctx) => {
  const userId = ctx.user.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ActionError("You don't have an account!");
  }

  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  await sendEmail({
    from: SiteConfig.email.from,
    subject: 'Your account has been deleted',
    to: user.email,
    react: DeleteAccountEmail({
      email: user.email,
    }),
  });
});
