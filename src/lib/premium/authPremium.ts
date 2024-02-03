import { auth } from "../auth/auth";
import prisma from "../prisma";

/**
 * Return onyl the user if it is a premium user, otherwise null
 */
export const authPremium = async () => {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return null;
  }

  if (user.plan === "FREE") {
    return null;
  }

  return user;
};
