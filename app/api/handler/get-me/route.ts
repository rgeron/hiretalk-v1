import { authHandler } from "@/lib/api/handlers";
import { NextResponse } from "next/server";
import { z } from "zod";

export const GET = authHandler(
  {
    paramsSchema: z.object({
      id: z.string(),
    }),
  },
  async ({ context, body, params }) => {
    return NextResponse.json({
      user: context.user,
      params,
    });
  }
);
