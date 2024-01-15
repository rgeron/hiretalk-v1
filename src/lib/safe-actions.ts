import { createSafeActionClient } from "next-safe-action";
import { auth } from "./auth";

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

export const userAction = createSafeActionClient({
  handleReturnedServerError,

  async middleware() {
    const session = await auth();

    if (!session) {
      throw new Error("Session not found!");
    }

    // In the real world, you would check if the session is valid by querying a database.
    // We'll keep it very simple here.
    const user = session.user;

    if (!user.id || !user.email) {
      throw new Error("Session is not valid!");
    }

    return {
      user: user as {
        id: string;
        email: string;
        image?: string;
        name?: string;
      },
    };
  },
});
