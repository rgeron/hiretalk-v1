import type EmailAdapter from "next-auth/providers/email";

type EmailAdapterType = typeof EmailAdapter;

type Params = Parameters<EmailAdapterType>[0];
type Return = ReturnType<EmailAdapterType>;

/** @todo Document this */
export default function TempResendAdapater(config: Params): Return {
  return {
    id: "resend" as never,
    type: "email",
    name: "Resend" as never,
    server: false,
    from: "Auth.js <no-reply@authjs.dev>",
    maxAge: 24 * 60 * 60,
    async sendVerificationRequest() {
      // nothing
    },
    options: config,
  };
}
