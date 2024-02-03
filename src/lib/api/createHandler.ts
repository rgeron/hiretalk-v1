import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { ZodError } from "zod";
import { type TypeOf, type ZodSchema } from "zod";

export type HandleReturnedServerErrorFn = (e: unknown) => NextResponse | string;

export type MiddlewareFn<TContext> = (req: NextRequest) => Promise<TContext>;

type CreateHandlerParams<TContext> = {
  middleware?: MiddlewareFn<TContext>;
  handleReturnedServerError?: HandleReturnedServerErrorFn;
};

type HandlerParams<TBody, TParams> = {
  bodySchema?: TBody;
  paramsSchema?: TParams;
};

type Callback<TContext, TBody, TParams> = (params: {
  request: NextRequest;
  context: TContext;
  body: TBody extends ZodSchema ? TypeOf<TBody> : undefined;
  params: TParams extends ZodSchema ? TypeOf<TParams> : undefined;
}) => Promise<unknown>;

class CustomZodError extends Error {
  type: "body" | "params";
  zodError: ZodError;
  received: unknown;
  constructor(type: "body" | "params", zodError: ZodError, received?: unknown) {
    super();
    this.type = type;
    this.zodError = zodError;
    this.received = received;
  }
}

export function createHandler<TContext>({
  middleware,
  handleReturnedServerError,
}: CreateHandlerParams<TContext>) {
  function handler<
    TBody extends ZodSchema | undefined,
    TParams extends ZodSchema | undefined
  >(
    { bodySchema, paramsSchema }: HandlerParams<TBody, TParams>,
    callback: Callback<TContext, TBody, TParams>
  ) {
    return async (req: NextRequest) => {
      try {
        let parsedBody: TBody | undefined = undefined;

        if (bodySchema && req.method !== "GET") {
          const json = await req.json();
          const bodyParseResult = bodySchema.safeParse(json);
          if (bodyParseResult.success) {
            parsedBody = bodyParseResult.data;
          } else {
            throw new CustomZodError("body", bodyParseResult.error, json);
          }
        }

        const url = new URL(req.url);
        const searchParams = url.searchParams;
        const params = {} as Record<string, string | string[]>;

        for (const [key, value] of searchParams.entries()) {
          params[key] = value;
        }

        let parsedParams: TParams | undefined = undefined;

        if (paramsSchema) {
          const paramsParseResult = paramsSchema.safeParse(params);
          if (paramsParseResult.success) {
            parsedParams = paramsParseResult.data;
          } else {
            throw new CustomZodError("params", paramsParseResult.error, params);
          }
        }

        const context = await middleware?.(req);

        const response = await callback({
          request: req,
          body: parsedBody as never,
          context: context as never,
          params: parsedParams as never,
        });

        return response;
      } catch (e: unknown) {
        // check if error is from zod
        if (e instanceof CustomZodError) {
          return NextResponse.json(
            {
              error: `Invalid ${e.type}.`,
              validation: e.zodError.errors,
              received: e.received,
            },
            {
              status: 400,
            }
          );
        }

        const returnedError = handleReturnedServerError?.(e);

        if (returnedError && typeof returnedError !== "string") {
          return returnedError;
        }

        return NextResponse.json(
          {
            error: returnedError || "An unexpected error occurred.",
          },
          {
            status: 400,
          }
        );
      }
    };
  }

  return handler;
}
