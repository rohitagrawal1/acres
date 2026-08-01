import { test, expect } from "@playwright/test";

test.describe("App Navigation & Pages", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "admin@acres.org.sg");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*:3000\/?$/);
  });

  test("should load home page", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Rescue Logs/ })).toBeVisible();
  });

  test("should load emergency contacts page", async ({ page }) => {
    await page.goto("/contacts");
    await expect(page.getByRole("heading", { name: "Emergency Contacts" })).toBeVisible();
    await expect(page.getByText("NPARKS Animal Response Centre")).toBeVisible();
  });

  test("should handle dynamic edit route params", async ({ page }) => {
    const response = await page.goto("/edit/non-existent-id");
    expect(response?.status()).toBe(404);
  });
});
