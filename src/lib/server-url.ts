import { SiteConfig } from '@/config';

export const getServerUrl = () => {
  if (process.env.IS_PRODUCTION) {
    return SiteConfig.prodUrl;
  }

  if (process.env.DEV_URL) {
    return process.env.DEV_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://127.0.0.1:3000/';
};
