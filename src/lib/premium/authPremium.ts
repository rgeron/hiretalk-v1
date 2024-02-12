import { auth } from "../auth/helper";

/**
 * Return onyl the user if it is a premium user, otherwise null
 */
export const authPremium = async () => {
  const user = await auth();

  const userId = user?.id;

  if (!userId) {
    return null;
  }

  if (user.plan === "FREE") {
    return null;
  }

  return user;
};
