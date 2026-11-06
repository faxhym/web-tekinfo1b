import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("semantic content, official sources and no unsolicited media", async ({
  page,
}) => {
  const errors = [],
    media = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => {
    if (r.url().endsWith(".mp4")) media.push(r.url());
  });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
  await expect(page.locator('meta[name="viewport"]')).toHaveAttribute(
    "content",
    /width=device-width/,
  );
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator(".program")).toHaveCount(4);
  await expect(page.locator(".program a")).toHaveCount(4);
  await expect(page.locator("#akreditasi")).toContainText(
    "belum diverifikasi ulang",
  );
  await expect(page.locator("video")).not.toHaveAttribute("autoplay");
  expect(media).toEqual([]);
  expect(errors).toEqual([]);
});

test("degree filters expose matching programs and restore all", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "D3", exact: true }).click();
  await expect(page.locator(".program:visible")).toHaveCount(2);
  await expect(page.locator("#program-count")).toHaveText(
    "2 program ditampilkan",
  );
  await expect(
    page.getByRole("button", { name: "D3", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "D4", exact: true }).click();
  await expect(page.locator(".program:visible")).toHaveCount(2);
  await page.getByRole("button", { name: "Semua", exact: true }).click();
  await expect(page.locator(".program:visible")).toHaveCount(4);
  await page.locator(".program summary").first().click();
  await expect(page.locator(".program").first()).toHaveAttribute("open", "");
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`responsive layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.locator(".program summary").nth(1).click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(page.locator("h1")).toBeVisible();
  });
}

test("mobile navigation keyboard, escape and in-page close", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Menu navigasi" });
  await expect(toggle).toBeVisible();
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .locator("#navigation")
    .getByRole("link", { name: "Program studi" })
    .click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("content and native disclosures remain usable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  await expect(page.locator(".program:visible")).toHaveCount(4);
  await page.locator(".program summary").first().click();
  await expect(page.locator(".program a").first()).toBeVisible();
  await expect(page.locator("#program-filters")).toBeHidden();
  await expect(page.locator("#navigation")).toBeVisible();
  await context.close();
});

test("reduced motion and enlarged text retain content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});

test("WCAG automated scan desktop and expanded mobile states", async ({
  page,
}) => {
  await page.goto("/");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Menu navigasi" }).click();
  await page.locator(".program summary").first().click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});
