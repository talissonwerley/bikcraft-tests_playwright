import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'https://bikcraft-gamma.vercel.app',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    /*{
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },*/
  ],
})
