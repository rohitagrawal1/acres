import { chromium, devices } from "@playwright/test";
import path from "path";

async function main() {
  // Use iPhone 13 mobile device emulation
  const iPhone = devices["iPhone 13"];
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    ...iPhone,
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();

  console.log("--- 1. MOBILE LOGIN ---");
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', "admin@acres.org.sg");
  await page.fill('input[name="password"]', "password123");
  await page.click('button[type="submit"]');
  await page.waitForURL("http://localhost:3000/");

  console.log("--- 2. GOTO /add ---");
  await page.goto("http://localhost:3000/add");
  await page.waitForSelector('select[name="species"]');

  const artifactDir = "/Users/rohit/.gemini/antigravity-ide/brain/4fb3a351-d112-431c-877d-48f397fdbc63";

  // Check initial state
  const initialBadge = await page.locator("span:has-text('Species Available')").innerText();
  const initialSpeciesVal = await page.locator('select[name="species"]').inputValue();
  console.log(`INITIAL (Mobile): Badge = "${initialBadge}", SpeciesVal = "${initialSpeciesVal}"`);
  await page.screenshot({ path: path.join(artifactDir, "mobile_initial.png") });

  // Test 1: Tap "Bird" Tile
  console.log("\n--- TEST 1: Tapping 'Bird' Tile ---");
  await page.tap('button:has-text("Bird")');
  await page.waitForTimeout(300);
  const birdBadge = await page.locator("span:has-text('Species Available')").innerText();
  const birdSpeciesVal = await page.locator('select[name="species"]').inputValue();
  console.log(`AFTER BIRD TAP: Badge = "${birdBadge}", SelectedVal = "${birdSpeciesVal}"`);

  // Test 2: Tap "Reptile" Tile
  console.log("\n--- TEST 2: Tapping 'Reptile' Tile ---");
  await page.tap('button:has-text("Reptile")');
  await page.waitForTimeout(300);
  const reptileBadge = await page.locator("span:has-text('Species Available')").innerText();
  const reptileSpeciesVal = await page.locator('select[name="species"]').inputValue();
  console.log(`AFTER REPTILE TAP: Badge = "${reptileBadge}", SelectedVal = "${reptileSpeciesVal}"`);

  // Test 3: Tap "Amphibian" Tile
  console.log("\n--- TEST 3: Tapping 'Amphibian' Tile ---");
  await page.tap('button:has-text("Amphibian")');
  await page.waitForTimeout(300);
  const amphibianBadge = await page.locator("span:has-text('Species Available')").innerText();
  const amphibianSpeciesVal = await page.locator('select[name="species"]').inputValue();
  console.log(`AFTER AMPHIBIAN TAP: Badge = "${amphibianBadge}", SelectedVal = "${amphibianSpeciesVal}"`);

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
