import { defineConfig } from "@playwright/test";
const engines = (process.env.TEST_BROWSERS || "chromium,firefox,webkit").split(
  ",",
);
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  retries: 0,
  use: { baseURL: "http://127.0.0.1:4173" },
  projects: engines.map((name) => ({
    name,
    use: {
      browserName: name,
      ...(name === "chromium" && process.env.CHROMIUM_PATH
        ? { launchOptions: { executablePath: process.env.CHROMIUM_PATH } }
        : {}),
    },
  })),
  webServer: {
    command: "npm start",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
  },
  reporter: [
    ["list"],
    ["json", { outputFile: "test-results/results.json" }],
    ["html", { open: "never" }],
  ],
});
