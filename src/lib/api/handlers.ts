import { auth } from "@/lib/auth/auth";
import { NextResponse } from "next/server";
import type { HandleReturnedServerErrorFn } from "./createHandler";
import { createHandler } from "./createHandler";

export class HandlerError extends Error {
  status = 400;
  constructor(message: string, status?: number) {
    super(message);
    if (status) {
      this.status = status;
    }
  }
}

const handleReturnedServerError: HandleReturnedServerErrorFn = (e) => {
  if (e instanceof HandlerError) {
    return NextResponse.json(
      {
        error: e.message,
      },
      {
        status: e.status,
      }
    );
  }

  return "An unexpected error occurred.";
};

export const handler = createHandler({
  handleReturnedServerError,
});

export const authHandler = createHandler({
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
      throw new HandlerError("Session is not valid!");
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
