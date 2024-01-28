import { GET as AuthGet, POST as AuthPost } from "@/lib/auth/auth";
import { nextRequestStorage } from "@/lib/auth/auth-next-request-store";
import type { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  return nextRequestStorage.run(req, async () => {
    return AuthGet(req);
  });
};

export const POST = async (req: NextRequest) => {
  const cloneRequest = req.clone();
  return nextRequestStorage.run(cloneRequest, async () => {
    return AuthPost(req);
  });
};
