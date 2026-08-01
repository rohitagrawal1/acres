import { SPECIES, getSpeciesEmoji } from "../src/lib/constants";

console.log("=== CHECKING SPECIES EMOJI ACCURACY ===");

for (const [category, speciesList] of Object.entries(SPECIES)) {
  if (["Mammals", "Birds", "Reptiles", "Snakes", "Lizards", "Errands", "Insect/Arthropod"].includes(category)) continue;
  console.log(`\n--- CATEGORY: ${category} ---`);
  for (const s of speciesList) {
    const emoji = getSpeciesEmoji(s, category);
    console.log(`${emoji}  ${s}`);
  }
}
