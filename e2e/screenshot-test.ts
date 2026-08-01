import { chromium } from "@playwright/test";
import path from "path";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Login
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', "admin@acres.org.sg");
  await page.fill('input[name="password"]', "password123");
  await page.click('button[type="submit"]');
  await page.waitForURL("http://localhost:3000/");

  // Go to /add
  await page.goto("http://localhost:3000/add");
  await page.waitForSelector('select[name="animal"]');

  const artifactDir = "/Users/rohit/.gemini/antigravity-ide/brain/4fb3a351-d112-431c-877d-48f397fdbc63";

  // 1. Initial state (Mammal)
  await page.screenshot({ path: path.join(artifactDir, "step1_mammal.png") });
  console.log("Step 1 (Mammal) badge text:", await page.locator("span:has-text('Options')").innerText());

  // 2. Select Bird
  await page.selectOption('select[name="animal"]', "Bird");
  await page.screenshot({ path: path.join(artifactDir, "step2_bird.png") });
  console.log("Step 2 (Bird) badge text:", await page.locator("span:has-text('Options')").innerText());

  // 3. Select Reptile
  await page.selectOption('select[name="animal"]', "Reptile");
  await page.screenshot({ path: path.join(artifactDir, "step3_reptile.png") });
  console.log("Step 3 (Reptile) badge text:", await page.locator("span:has-text('Options')").innerText());

  // 4. Select Amphibian
  await page.selectOption('select[name="animal"]', "Amphibian");
  await page.screenshot({ path: path.join(artifactDir, "step4_amphibian.png") });
  console.log("Step 4 (Amphibian) badge text:", await page.locator("span:has-text('Options')").innerText());

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
