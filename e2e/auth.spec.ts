import { test, expect } from "@playwright/test";

test.describe("Authentication Flows", () => {
  test("should redirect unauthenticated users to login", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/.*\/login/);
  });

  test("should show error for invalid credentials", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "wrong@acres.org.sg");
    await page.fill('input[name="password"]', "wrongpassword");
    await page.click('button[type="submit"]');

    await expect(page.getByText("Invalid email or password")).toBeVisible();
  });

  test("should login successfully with valid credentials and allow logout", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "admin@acres.org.sg");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    // Should be redirected to home page
    await expect(page).toHaveURL(/.*:3000\/?$/);
    await expect(page.getByRole("heading", { name: /Rescue Logs/ })).toBeVisible();

    // Test profile and logout
    await page.goto("/profile");
    await expect(page.getByText("Admin User")).toBeVisible();
    await page.click('button:has-text("Sign Out")');

    // Should be redirected to login
    await expect(page).toHaveURL(/.*\/login/);
  });
});
