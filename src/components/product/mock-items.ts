// data/mockItems.ts
import {
  Item,
  CraftingRecipe,
  ItemType,
  ItemRarity,
} from "@/types/inventory.ts";

// Helper function to generate price history
const generatePriceHistory = (basePrice: number) => {
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toISOString().split("T")[0],
      price: basePrice * (0.8 + Math.random() * 0.4), // Random variation ±20%
    };
  });
  return last30Days;
};

export const mockItems: Item[] = [
  // Basic Materials
  {
    id: "titanium-ore",
    name: "Titanium Ore",
    description:
      "Raw titanium ore, essential for basic ship construction and tools.",
    type: "material",
    rarity: "common",
    imageUrl: "/items/titanium-ore.png", // Placeholder image
    quantity: 150,
    marketPrice: 100,
    priceHistory: generatePriceHistory(100),
  },
  {
    id: "quantum-crystal",
    name: "Quantum Crystal",
    description:
      "Rare crystals with quantum properties, used in advanced electronics.",
    type: "material",
    rarity: "epic",
    imageUrl: "/items/quantum-crystal.png",
    quantity: 5,
    marketPrice: 2000,
    priceHistory: generatePriceHistory(2000),
  },
  {
    id: "plasma-core",
    name: "Plasma Core",
    description: "Stabilized plasma energy source for high-powered engines.",
    type: "component",
    rarity: "rare",
    imageUrl: "/items/plasma-core.png",
    quantity: 3,
    marketPrice: 1500,
    priceHistory: generatePriceHistory(1500),
  },
  {
    id: "nano-circuits",
    name: "Nano Circuits",
    description: "Microscopic circuitry for advanced ship systems.",
    type: "component",
    rarity: "uncommon",
    imageUrl: "/items/nano-circuits.png",
    quantity: 25,
    marketPrice: 300,
    priceHistory: generatePriceHistory(300),
  },

  // Ship Components
  {
    id: "warp-drive",
    name: "Warp Drive",
    description: "Standard FTL drive for interstellar travel.",
    type: "component",
    rarity: "epic",
    imageUrl: "/items/warp-drive.png",
    quantity: 1,
    marketPrice: 5000,
    priceHistory: generatePriceHistory(5000),
    recipe: {
      materials: [
        { itemId: "quantum-crystal", quantity: 2 },
        { itemId: "plasma-core", quantity: 1 },
        { itemId: "nano-circuits", quantity: 5 },
      ],
    },
  },

  // Ships
  {
    id: "scout-ship",
    name: "Scout Ship",
    description: "Light and fast reconnaissance vessel.",
    type: "ship",
    rarity: "rare",
    imageUrl: "/items/scout-ship.png",
    quantity: 1,
    equipped: true,
    marketPrice: 10000,
    priceHistory: generatePriceHistory(10000),
    recipe: {
      materials: [
        { itemId: "titanium-ore", quantity: 50 },
        { itemId: "warp-drive", quantity: 1 },
        { itemId: "nano-circuits", quantity: 10 },
      ],
    },
  },
];

// Add more items following the same pattern...

export const mockRecipes: (CraftingRecipe & { name: string })[] = [
  {
    name: "Warp Drive",
    resultId: "warp-drive",
    materials: [
      { itemId: "quantum-crystal", quantity: 2 },
      { itemId: "plasma-core", quantity: 1 },
      { itemId: "nano-circuits", quantity: 5 },
    ],
    craftingTime: 300, // 5 minutes
  },
  {
    name: "Scout Ship",
    resultId: "scout-ship",
    materials: [
      { itemId: "titanium-ore", quantity: 50 },
      { itemId: "warp-drive", quantity: 1 },
      { itemId: "nano-circuits", quantity: 10 },
    ],
    craftingTime: 600, // 10 minutes
  },
];

// Add more recipes...
