import { SiteConfig } from "@/site-config";

export const getServerUrl = () => {
  if (process.env.VERCEL_ENV === "production") {
    return SiteConfig.prodUrl;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
};
