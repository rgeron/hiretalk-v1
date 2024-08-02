import { OrganizationMembershipRole, type User } from "@prisma/client";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { auth } from "../auth/helper";
import { getRequiredCurrentOrganization } from "../organizations/getCurrentOrganization";

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
  }
}

type HandleReturnedServerError = (e: Error) => string;

const handleReturnedServerError: HandleReturnedServerError = (e) => {
  if (e instanceof ActionError) {
    return e.message;
  }

  return "An unexpected error occurred.";
};

export const action = createSafeActionClient({
  handleReturnedServerError,
});

const getUser = async () => {
  const user = await auth();

  if (!user) {
    throw new ActionError("Session not found!");
  }

  // In the real world, you would check if the session is valid by querying a database.
  // We'll keep it very simple here.

  if (!user.id || !user.email) {
    throw new ActionError("Session is not valid!");
  }

  return user as User;
};

export const authAction = createSafeActionClient({
  handleReturnedServerError,
}).use(async ({ next }) => {
  const user = await getUser();

  return next({
    ctx: {
      user: user as User,
    },
  });
});

export const orgAction = createSafeActionClient({
  handleReturnedServerError,
  defineMetadataSchema() {
    return z.object({
      roles: z.array(z.nativeEnum(OrganizationMembershipRole)),
    });
  },
}).use(async ({ next, metadata }) => {
  try {
    const org = await getRequiredCurrentOrganization(metadata.roles);
    return next({
      ctx: org,
    });
  } catch (e) {
    throw new ActionError(
      "You need to be part of an organization to access this resource.",
    );
  }
});
