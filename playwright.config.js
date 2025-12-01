// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import dotenv from 'dotenv';
import path from 'path';
import os from 'os';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [
      "allure-playwright",
      {
        environmentInfo: {
          "Platform": os.platform(),
          "Release": os.release(),
          "Version": os.version(),
          "Node Version": process.version,
        },
      },
    ], 
    ['line']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL,
    /* Increase default navigation timeout to reduce flakiness on slow pages.
       This controls how long Playwright will wait for navigation methods like
       `page.goto()` before timing out. */
    navigationTimeout: 60000,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: {
          width: 1440, height: 764
        }
      },
      testDir: defineBddConfig({
        outputDir: ".features-gen/web_chrome",
        features: 'tests/web/features/*.feature',
        steps: 'tests/web/step_definitions/*.js',
      })
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['iPhone 15'] },
      testDir: defineBddConfig({
        outputDir: ".features-gen/mobile_chrome",
        features: 'tests/mobile/features/*.feature',
        steps: 'tests/mobile/step_definitions/*.js',
      })
    },
  ],
});