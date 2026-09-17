import {defineConfig} from '@playwright/test';

export default defineConfig({
  testDir:'./e2e',
  timeout:30_000,
  use:{
    baseURL:'http://127.0.0.1:3000',
    viewport:{width:375,height:812},
    trace:'retain-on-failure'
  },
  webServer:{
    command:'npm run start',
    url:'http://127.0.0.1:3000',
    reuseExistingServer:!process.env.CI,
    timeout:120_000
  }
});
