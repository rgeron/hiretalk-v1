import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";
import { getServerUrl } from "./src/lib/server-url";

const SERVER_URL = process.env.PLAYWRIGHT_TEST_BASE_URL ?? getServerUrl();

const HEADLESS = process.env.HEADLESS
  ? process.env.HEADLESS.toLowerCase() === "true"
  : true;

const config: PlaywrightTestConfig = {
  // 50 seconds
  timeout: 50 * 1000,
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  globalTeardown: require.resolve("./e2e/global-teardown.ts"),
  use: {
    headless: HEADLESS,
    contextOptions: {
      extraHTTPHeaders: {
        "x-vercel-protection-bypass":
          process.env.VERCEL_AUTOMATION_BYPASS_SECRET ?? "",
      },
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
    },
    ignoreHTTPSErrors: true,
    video: "on-first-retry",
    baseURL: SERVER_URL,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 720 },
    geolocation: { longitude: 2.3488, latitude: 48.8534 },
    permissions: ["geolocation"],
    actionTimeout: 15000,
    navigationTimeout: 15000,
  },
  testDir: "e2e",
  // Only start the web server if PLAYWRIGHT_TEST_BASE_URL is not set
  ...(SERVER_URL
    ? {}
    : {
        webServer: {
          command: "pnpm run build; pnpm run start",
          url: SERVER_URL,
          timeout: 120 * 1000,
          reuseExistingServer:
            process.env.NODE_ENV === "development" ? !process.env.CI : true,
        },
      }),
};

export default config;
