import type { User } from "@prisma/client";
import { auth } from "./auth";

export const requiredAuth = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be authenticated to access this resource.");
  }

  const user = session.user as User;

  return user;
};
