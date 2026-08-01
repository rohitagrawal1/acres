import { test, expect } from "@playwright/test";

test.describe("Search Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "admin@acres.org.sg");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*:3000\/?$/);
    await page.goto("/search");
  });

  test("should render search page header and elements", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Search Logs" })).toBeVisible();
    await expect(page.getByPlaceholder("Enter keyword...")).toBeVisible();
    await expect(page.getByRole("combobox")).toBeVisible();
    await expect(page.getByRole("button", { name: "Search" })).toBeVisible();
  });

  test("should allow typing search query and changing category dropdown", async ({ page }) => {
    const input = page.getByPlaceholder("Enter keyword...");
    await input.fill("Pangolin");
    await expect(input).toHaveValue("Pangolin");

    const select = page.getByRole("combobox");
    await select.selectOption("location");
    await expect(select).toHaveValue("location");
  });
});
