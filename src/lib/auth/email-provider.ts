import { SiteConfig } from "@/site-config";
import type { SendVerificationRequestParams } from "next-auth/providers/email";
import Email from "next-auth/providers/email";
import MagicLinkMail from "../../../emails/MagicLinkEmail";
import { sendEmail } from "../mail/sendEmail";

export const getEmailProvider = () => {
  return Email({
    from: SiteConfig.email.from,
    sendVerificationRequest: (async ({
      identifier: email,
      url,
    }: SendVerificationRequestParams) => {
      const result = await sendEmail({
        from: SiteConfig.email.from,
        to: email,
        subject: `Sign in to ${SiteConfig.domain}`,
        react: MagicLinkMail({
          url,
        }),
      });

      if (result.error) {
        throw new Error(`Failed to send email: ${result.error}`);
      }

      return result;
    }) as never,
  });
};
