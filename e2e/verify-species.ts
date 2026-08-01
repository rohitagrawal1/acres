import { chromium } from "@playwright/test";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("--- TEST CYCLE 1: LOGIN ---");
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', "admin@acres.org.sg");
  await page.fill('input[name="password"]', "password123");
  await page.click('button[type="submit"]');
  await page.waitForURL("http://localhost:3000/");

  console.log("--- TEST CYCLE 2: GOTO /add ---");
  await page.goto("http://localhost:3000/add");

  const categories = [
    { text: "Bird", label: "Bird" },
    { text: "Reptile", label: "Reptile" },
    { text: "Amphibian", label: "Amphibian" },
    { text: "Mammal", label: "Mammal" },
    { text: "Domestic", label: "Domestic" },
  ];

  for (let i = 0; i < 3; i++) {
    console.log(`\n--- RUN #${i + 1} ---`);
    for (const cat of categories) {
      await page.click(`button:has-text("${cat.text}")`);
      
      const options = await page.locator('select[name="species"] option').allInnerTexts();
      const selectedVal = await page.locator('select[name="species"]').inputValue();
      console.log(`Category Chip: ${cat.label} | Selected species: "${selectedVal}" | Options count: ${options.length} | First options: ${options.slice(0, 3).join(" | ")}`);
    }
  }

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
