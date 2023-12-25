import { auth } from "../auth";
import prisma from "../prisma";

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
