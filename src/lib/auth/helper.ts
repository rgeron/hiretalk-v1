import prisma from "../prisma";
import { auth } from "./auth";

export const requiredAuth = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be authenticated to access this resource.");
  }

  return session as Required<typeof session>;
};

export const requiredFullAuth = async () => {
  const session = await requiredAuth();

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: session.user.id,
    },
  });

  return user;
};
