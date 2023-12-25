import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/resend";
import { SiteConfig } from "@/site-config";
import { User } from "@prisma/client";

export const upgradeUserToPremium = async (userId: string) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      plan: "PREMIUM",
    },
  });
    
};

export const downgradeUserFromPremium = async (userId: string) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      plan: "PREMIUM",
    },
  });
};

export const notifyUserOfPremiumUpgrade = async (user: User) => {
  // TODO : Update premium email
  await sendEmail({
    from: SiteConfig.email.from,
    to: user.email,
    subject: `You are now a premium member of ${SiteConfig.domain}`,
    text: "You are now a premium member of " + SiteConfig.domain,
  });
};

export const notifyUserOfPremiumDowngrade = async (user: User) => {
  // TODO : Update premium email
  await sendEmail({
    from: SiteConfig.email.from,
    to: user.email,
    subject: `You are no longer a premium member of ${SiteConfig.domain}`,
    text: "You are no longer a premium member of " + SiteConfig.domain,
  });
};

export const notifyUserOfPaymentFailure = async (user: User) => {
  // TODO : Update premium email
  await sendEmail({
    from: SiteConfig.email.from,
    to: user.email,
    subject: `Your payment for ${SiteConfig.domain} failed`,
    text: "Your payment for " + SiteConfig.domain + " failed",
  });
};
