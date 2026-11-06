import { test, expect } from "@playwright/test";
for (const width of [390, 1440])
  test(`visual checkpoint ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toBeVisible();
    await page.screenshot({
      path: testInfo.outputPath(`page-${width}.png`),
      fullPage: true,
      animations: "disabled",
    });
    if (process.env.VISUAL_REGRESSION === "1")
      await expect(page).toHaveScreenshot(`page-${width}.png`, {
        fullPage: true,
        animations: "disabled",
        maxDiffPixelRatio: 0.002,
      });
  });
