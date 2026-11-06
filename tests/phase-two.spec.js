import { test, expect } from "@playwright/test";

test("editorial guide and source boundary are explicit", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#panduan")).toContainText("bukan kurikulum resmi");
  await expect(page.locator("#source-status")).toContainText(
    "belum dapat diverifikasi",
  );
  await expect(page.locator(".program-map")).toBeVisible();
  await expect(page.locator(".legacy-artifact img")).toBeHidden();
  await page.locator(".legacy-artifact summary").click();
  await expect(page.locator(".legacy-artifact img")).toBeVisible();
});
test("navigation moves keyboard focus out of collapsed menu", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu navigasi" }).click();
  await page.locator('#navigation a[href="#tentang"]').click();
  await expect(page.locator("#about-title")).toBeFocused();
});
test("failed enhancement script leaves useful content and navigation", async ({
  page,
}) => {
  await page.route("**/script.js", (r) => r.abort());
  await page.goto("/");
  await expect(page.locator("#navigation")).toBeVisible();
  await expect(page.locator("#program-filters")).toBeHidden();
  await expect(page.locator(".program:visible")).toHaveCount(4);
  await expect(page.locator("#panduan")).toBeVisible();
});
test("repeated filtering closes hidden disclosures", async ({ page }) => {
  await page.goto("/");
  await page.locator(".program summary").first().click();
  for (let i = 0; i < 3; i++)
    for (const name of ["D4", "D3", "Semua"]) {
      await page.getByRole("button", { name, exact: true }).click();
      await expect(page.locator(".program:visible")).toHaveCount(
        name === "Semua" ? 4 : 2,
      );
    }
  await expect(page.locator(".program").first()).not.toHaveAttribute(
    "open",
    "",
  );
});
test("loaded local font at 200% retains mobile layout", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: "html{font-size:200%!important}" });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("failed source image does not remove readable program map", async ({
  page,
}) => {
  await page.route("**/assets/program-studi*.webp", (r) => r.abort());
  await page.goto("/");
  await expect(page.locator(".program-map")).toContainText("Teknik Komputer");
  await expect(page.locator(".program-map")).toContainText("Animasi");
});
