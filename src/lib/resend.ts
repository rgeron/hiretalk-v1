import { Resend } from "resend";
import { env } from "./env";

export const resend = new Resend(env.RESEND_API_KEY);

type ResendEmailsSendOptions = typeof resend.emails.send;

export const sendEmail = (...params: Parameters<ResendEmailsSendOptions>) => {
  return resend.emails.send(...params);
};
