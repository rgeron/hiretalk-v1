import { SiteConfig } from "@/site-config";
import type { SendVerificationRequestParams } from "next-auth/providers/email";
import MagicLinkMail from "../../../emails/MagicLinkEmail";
import { resend } from "../mail/resend";
import { getServerUrl } from "../server-url";

const replaceOrigin = (url: string) => {
  const regex =
    /^(?:https?:\/\/)?(?:[^\n@]+@)?(?:www\.)?([^\n/:]+)(?::\d+)?(\/[^#?]*)?/gim;
  const link = url.replace(regex, "$2");

  return getServerUrl() + link;
};

export const sendVerificationRequest = async (
  params: SendVerificationRequestParams
) => {
  const { identifier, url } = params;

  console.log("SEND EMAIL", identifier);

  const result = await resend.emails.send({
    from: SiteConfig.email.from,
    to: identifier,
    subject: `Your magic link 📣`,
    react: MagicLinkMail({ url: replaceOrigin(url) }),
  });
  console.error(result);
};
