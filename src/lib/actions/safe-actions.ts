import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { AuthPermissionSchema, RolesKeys } from "../auth/auth-permissions";
import { getRequiredUser } from "../auth/auth-user";
import { logger } from "../logger";
import { getRequiredCurrentOrg } from "../organizations/get-org";

export class ActionError extends Error {}

type handleServerError = (e: Error) => string;

const handleServerError: handleServerError = (e) => {
  if (e instanceof ActionError) {
    logger.debug("[DEV] - Action Error", e.message);
    return e.message;
  }

  logger.info("Unknown Error", e);

  if (process.env.NODE_ENV === "development") {
    return e.message;
  }

  return "An unexpected error occurred.";
};

export const action = createSafeActionClient({
  handleServerError,
});

export const authAction = createSafeActionClient({
  handleServerError,
}).use(async ({ next }) => {
  const user = await getRequiredUser();

  return next({
    ctx: {
      user: user,
    },
  });
});

export const orgAction = createSafeActionClient({
  handleServerError,
  defineMetadataSchema() {
    return z
      .object({
        roles: z.array(z.enum(RolesKeys)).optional(),
        permissions: AuthPermissionSchema.optional(),
      })
      .optional();
  },
}).use(async ({ next, metadata = {} }) => {
  try {
    const org = await getRequiredCurrentOrg(metadata);
    return next({
      ctx: org,
    });
  } catch {
    throw new ActionError(
      "You need to be part of an organization to access this resource.",
    );
  }
});
