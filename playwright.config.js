const { defineConfig, devices } = require("@playwright/test");

const AUTH_SUITE = /CodeQuest authenticated learner journey/;

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 50000,
  expect: { timeout: 15000 },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 15000,
    navigationTimeout: 30000
  },
  projects: [
    {
      name: "chromium",
      grepInvert: AUTH_SUITE,
      use: { ...devices["Desktop Chrome"] }
    },
    {
      name: "mobile-chrome",
      grepInvert: AUTH_SUITE,
      use: { ...devices["Pixel 7"] }
    },
    {
      name: "authenticated-chromium",
      grep: AUTH_SUITE,
      workers: 1,
      fullyParallel: false,
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});
