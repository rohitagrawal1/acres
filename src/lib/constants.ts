export const PRIORITIES = [
  "Priority",
  "Urgent",
  "Get Updates",
  "Call before going",
  "Contained, ACRES to pickup",
  "Sending to us",
  "For Reunion",
];

export const ACTIONS_TAKEN = [
  "Pending",
  "Advised Only",
  "Visit Only",
  "Rescued",
  "Dead On Arrival",
  "Errand Completed",
  "Domestic",
];

export const STATUSES = [
  "Status",
  "Pending",
  "Mandal",
  "ACRES",
  "Released",
  "No Action Required",
  "Not in View",
];

export const ANIMALS = [
  "Mammal",
  "Bird",
  "Reptile",
  "Amphibian",
  "Insect / Arthropod",
  "Domestic",
  "Errand",
  "Other",
];

// Comprehensive species list covering all Singapore species
export const SPECIES: Record<string, string[]> = {
  Mammal: [
    "Long-tailed Macaque (Monkey)",
    "Plantain Squirrel",
    "Asian House Shrew / Rat",
    "Common Palm Civet",
    "Fruit Bat / Flying Fox",
    "Sunda Pangolin",
    "Smooth-coated Otter",
    "Wild Boar",
    "Sunda Colugo (Flying Lemur)",
    "Lesser Mouse-Deer",
    "Other Mammal",
  ],
  Bird: [
    "Javan Myna / White-vented Myna",
    "Asian Koel",
    "Pink-necked Green Pigeon",
    "Rock Pigeon",
    "Spotted Dove",
    "House Crow",
    "Yellow-vented Bulbul",
    "Black-naped Oriole",
    "Red-whiskered Bulbul",
    "Common Tailorbird",
    "Collared Kingfisher",
    "Olive-backed Sunbird",
    "Eurasian Tree Sparrow",
    "Asian Glossy Starling",
    "Barn Owl",
    "Barred Eagle-owl",
    "Black Bittern",
    "Blue-crowned Hanging Parrot",
    "Blue-winged Pitta",
    "Brown Boobook",
    "Buffy Fish Owl",
    "Changeable Hawk Eagle",
    "Chinese Sparrowhawk",
    "Cinnamon Bittern",
    "Common Myna",
    "Coppersmith Barbet",
    "Crested Goshawk",
    "Egret",
    "Emerald Dove",
    "Hawk-cuckoo",
    "Heron",
    "Hooded Pitta",
    "Indian Ringneck",
    "Japanese Sparrowhawk",
    "Javan Munia",
    "Jambu Fruit Dove",
    "Large-tailed Nightjar",
    "Long-tailed Parakeet",
    "Mangrove Pitta",
    "Northern Boobook",
    "Oriental Honey Buzzard",
    "Oriental Magpie-robin",
    "Oriental Pied Hornbill",
    "Oriental Scops Owl",
    "Pied Imperial Pigeon",
    "Poultry / Chicken",
    "Red-breasted Parakeet",
    "Red Junglefowl",
    "Slaty-breasted Rail",
    "Spotted Whistling Duck",
    "Spotted Wood Owl",
    "Sunda Pygmy Woodpecker",
    "Sunda Scops Owl",
    "Thick-billed Green Pigeon",
    "Watercock",
    "White-bellied Sea Eagle",
    "White-breasted Waterhen",
    "White-crested Laughingthrush",
    "White-throated Kingfisher",
    "Yellow Bittern",
    "Zebra Dove",
    "Other Birds",
  ],
  Reptile: [
    "Reticulated Python",
    "Malayan Water Monitor Lizard",
    "Clouded Monitor Lizard",
    "Oriental Whip Snake",
    "Paradise Tree Snake",
    "Equatorial Spitting Cobra",
    "Changeable Lizard",
    "Red-eared Slider / Terrapin",
    "Sunbeam Snake",
    "Brahminy Blind Snake",
    "Dog-faced Water Snake",
    "Dog-toothed Cat Snake",
    "Elegant Bronzeback",
    "Gold-ringed Cat Snake",
    "Indochinese Rat Snake",
    "Keeled Rat Snake",
    "King Cobra",
    "Kopstein's Bronzeback",
    "Malayan Racer",
    "Ornate Tree Snake",
    "Painted Bronzeback",
    "Red-tailed Racer",
    "Shore Pit Viper",
    "Striped Bronzeback",
    "Striped Keelback",
    "Striped Kukri Snake",
    "Twin-barred Tree Snake",
    "Wagler's Pit Viper",
    "White-bellied Rat Snake",
    "White-spotted Slug Snake",
    "Wolf Snake",
    "Common Gliding Lizard",
    "Common Sunskink",
    "Estuarine Crocodile",
    "Other Reptile / Snake / Lizard",
  ],
  Amphibian: [
    "Asian Toad",
    "Banded Bullfrog",
    "Four-lined Tree Frog",
    "Crab-eating Frog",
    "Other Amphibian",
  ],
  "Insect / Arthropod": [
    "Honey Bee / Wasp / Hornet",
    "Giant Forest Scorpion",
    "Tarantula / Spider",
    "Centipede",
    "Other Insect",
  ],
  Domestic: [
    "Domestic Dog",
    "Domestic Cat",
    "Pet Rabbit",
    "Pet Bird / Parrot",
    "Pet Guinea Pig / Hamster",
    "Other Domestic Animal",
  ],
  Errand: [
    "Errand / Supply Pickup",
    "Equipment Transport",
    "Vet Delivery",
    "Other Errand",
  ],
  Other: [
    "General Wildlife Errand",
    "Unidentified Animal",
    "Other",
  ],
};

// Aliases mapping for backwards compatibility and synonyms
SPECIES["Mammals"] = SPECIES["Mammal"];
SPECIES["Birds"] = SPECIES["Bird"];
SPECIES["Reptiles"] = SPECIES["Reptile"];
SPECIES["Snakes"] = SPECIES["Reptile"];
SPECIES["Lizards"] = SPECIES["Reptile"];
SPECIES["Errands"] = SPECIES["Errand"];
SPECIES["Insect/Arthropod"] = SPECIES["Insect / Arthropod"];

export function normalizeAnimalCategory(cat: string): string {
  if (!cat) return "Mammal";
  const trimmed = cat.trim();
  if (ANIMALS.includes(trimmed)) return trimmed;

  const lower = trimmed.toLowerCase();
  if (lower.includes("bird")) return "Bird";
  if (lower.includes("reptile") || lower.includes("snake") || lower.includes("lizard") || lower.includes("turtle") || lower.includes("python")) return "Reptile";
  if (lower.includes("mammal") || lower.includes("monkey") || lower.includes("squirrel")) return "Mammal";
  if (lower.includes("amphibian") || lower.includes("frog") || lower.includes("toad")) return "Amphibian";
  if (lower.includes("insect") || lower.includes("arthropod") || lower.includes("bee") || lower.includes("wasp")) return "Insect / Arthropod";
  if (lower.includes("domestic")) return "Domestic";
  if (lower.includes("errand")) return "Errand";

  return "Other";
}

export function getSpeciesList(animalCategory: string): string[] {
  const norm = normalizeAnimalCategory(animalCategory);
  if (SPECIES[norm]) return SPECIES[norm];
  return SPECIES["Other"];
}

export function getSpeciesEmoji(speciesName: string, animalCategory?: string): string {
  if (!speciesName) return "🐾";
  const s = speciesName.toLowerCase();

  // 1. Birds (Checked FIRST so "pigeon" is not matched by "pig")
  if (s.includes("pigeon") || s.includes("dove")) return "🕊️";
  if (s.includes("fowl") || s.includes("chicken") || s.includes("poultry")) return "🐔";
  if (s.includes("duck")) return "🦆";
  if (s.includes("owl") || s.includes("boobook")) return "🦉";
  if (s.includes("eagle") || s.includes("hawk") || s.includes("goshawk") || s.includes("buzzard") || s.includes("falcon") || s.includes("osprey") || s.includes("kestrel")) return "🦅";
  if (s.includes("parrot") || s.includes("parakeet") || s.includes("lorikeet") || s.includes("cockatoo") || s.includes("myna") || s.includes("starling") || s.includes("macaw")) return "🦜";
  if (s.includes("heron") || s.includes("egret") || s.includes("bittern") || s.includes("stork")) return "🦩";
  if (s.includes("kingfisher") || s.includes("hornbill") || s.includes("pitta") || s.includes("sunbird") || s.includes("bulbul") || s.includes("koel") || s.includes("crow") || s.includes("sparrow") || s.includes("robin") || s.includes("drongo") || s.includes("munia") || s.includes("nightjar") || s.includes("swift") || s.includes("swallow") || s.includes("barbet") || s.includes("cuckoo") || s.includes("woodpecker")) return "🐦";

  // 2. Snakes & Reptiles
  if (s.includes("python") || s.includes("cobra") || s.includes("krait") || s.includes("viper") || s.includes("racer") || s.includes("snake") || s.includes("whip") || s.includes("bronzeback") || s.includes("keelback") || s.includes("kukri")) return "🐍";
  if (s.includes("lizard") || s.includes("monitor") || s.includes("gecko") || s.includes("skink") || s.includes("dragon") || s.includes("chameleon")) return "🦎";
  if (s.includes("turtle") || s.includes("terrapin") || s.includes("tortoise")) return "🐢";
  if (s.includes("crocodile")) return "🐊";

  // 3. Mammals & Small Pets
  if (s.includes("guinea pig") || s.includes("hamster")) return "🐹";
  if (s.includes("boar") || s.includes("wild pig")) return "🐗";
  if (s.includes("macaque") || s.includes("monkey") || s.includes("langur")) return "🐒";
  if (s.includes("squirrel")) return "🐿️";
  if (s.includes("otter")) return "🦦";
  if (s.includes("pangolin")) return "🦔";
  if (s.includes("bat") || s.includes("flying fox")) return "🦇";
  if (s.includes("civet")) return "🐱";
  if (s.includes("colugo") || s.includes("lemur") || s.includes("deer")) return "🦌";
  if (s.includes("dog")) return "🐶";
  if (s.includes("domestic cat") || s.endsWith("cat") || s === "cat") return "🐱";
  if (s.includes("rat") || s.includes("mouse") || s.includes("shrew")) return "🐀";
  if (s.includes("rabbit")) return "🐇";

  // 4. Amphibians & Insects
  if (s.includes("toad") || s.includes("frog") || s.includes("bullfrog")) return "🐸";
  if (s.includes("bee") || s.includes("wasp") || s.includes("hornet")) return "🐝";
  if (s.includes("spider") || s.includes("tarantula")) return "🕷️";
  if (s.includes("scorpion")) return "🦂";
  if (s.includes("beetle") || s.includes("ant") || s.includes("centipede") || s.includes("millipede") || s.includes("caterpillar") || s.includes("mantis") || s.includes("butterfly") || s.includes("moth")) return "🐛";

  // 5. Errands
  if (s.includes("pickup") || s.includes("transport") || s.includes("delivery") || s.includes("errand")) return "🚚";

  // Category defaults fallback
  if (animalCategory) {
    const norm = normalizeAnimalCategory(animalCategory);
    if (norm === "Bird") return "🐦";
    if (norm === "Reptile") return "🐍";
    if (norm === "Mammal") return "🐒";
    if (norm === "Amphibian") return "🐸";
    if (norm === "Insect / Arthropod") return "🐝";
    if (norm === "Domestic") return "🐱";
    if (norm === "Errand") return "🚚";
  }

  return "🐾";
}

