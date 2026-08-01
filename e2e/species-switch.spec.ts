import { test, expect } from "@playwright/test";

test.describe("Species Dropdown Switching Test", () => {
  test("should dynamically update species options when animal category chip is clicked", async ({ page }) => {
    // First login as admin
    await page.goto("/login");
    await page.fill('input[name="email"]', "admin@acres.org.sg");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*:3000\/?$/);

    // Go to Add Case page
    await page.goto("/add");
    await expect(page.getByText("1. Animal & Location Details")).toBeVisible();

    const speciesSelect = page.locator('select[name="species"]');

    // 1. Click Mammal chip
    await page.click('button:has-text("Mammal")');
    await expect(speciesSelect.locator('option:has-text("Long-tailed Macaque")')).toBeAttached();

    // 2. Click Bird chip
    await page.click('button:has-text("Bird")');
    await expect(speciesSelect.locator('option:has-text("Asian Koel")')).toBeAttached();
    await expect(speciesSelect.locator('option:has-text("Javan Myna")')).toBeAttached();

    // 3. Click Reptile chip
    await page.click('button:has-text("Reptile")');
    await expect(speciesSelect.locator('option:has-text("Reticulated Python")')).toBeAttached();
    await expect(speciesSelect.locator('option:has-text("Water Monitor Lizard")')).toBeAttached();

    // 4. Click Amphibian chip
    await page.click('button:has-text("Amphibian")');
    await expect(speciesSelect.locator('option:has-text("Asian Toad")')).toBeAttached();

    // 5. Click Insect chip
    await page.click('button:has-text("Insect")');
    await expect(speciesSelect.locator('option:has-text("Honey Bee")')).toBeAttached();
  });
});
