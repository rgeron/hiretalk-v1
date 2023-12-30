import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";
import type { Session } from "next-auth/types";
import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";

type HandlerCallback = (
  req: NextRequest,
  user: Session["user"] | undefined | null
) => Promise<NextResponse | null>;

export class HandlerError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.name = "HandlerError";
    this.status = status;
  }
}

export const handler =
  (callback: HandlerCallback) => async (req: NextRequest) => {
    const session = await auth();
    try {
      const response = await callback(req, session?.user);
      if (response) {
        return response;
      }
      return NextResponse.json({
        message: "ok",
      });
    } catch (e: unknown) {
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

      logger.error("[handler] - unhandled error", e);

      return NextResponse.json(
        {
          error: "Something went wrong.",
        },
        {
          status: 400,
        }
      );
    }
  };

export const authenticatedHandler = (callback: HandlerCallback) =>
  handler(async (req, user) => {
    if (!user) {
      return NextResponse.json(
        {
          error: "You must be authenticated to access this resource.",
        },
        {
          status: 401,
        }
      );
    }
    return callback(req, user);
  });
