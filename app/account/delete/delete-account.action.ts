'use server';

import { userAction } from '@/lib/safe-actions';
import { z } from 'zod';

const deleteAccountAction = userAction(z.any(), async (_, ctx) => {
  const userId = ctx.user.id;

  // delete user

  return '';
});
