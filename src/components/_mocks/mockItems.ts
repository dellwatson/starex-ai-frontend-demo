// mocks/mockItems.ts
import {
  BaseItem,
  ItemType,
  ItemCategory,
  SpaceshipItem,
  ZoneBase,
} from "@/types/items.interface";
// Helper function to generate price history
export const generatePriceHistory = (basePrice: number) => {
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

export const mockItems: BaseItem[] = [
  // Base Spaceship
  {
    id: "ship-1",
    name: "Scout Ship Alpha",
    type: ItemType.SPACESHIP,
    category: ItemCategory.SHIP,
    quantity: 1,
    health: 100,
    maxHealth: 100,
    shield: 50,
    maxShield: 50,
    speed: 100,
    capacity: 1000,
    priceHistory: generatePriceHistory(100),
  } as SpaceshipItem,

  // Consumables
  {
    id: "fuel-1",
    name: "Standard Fuel Cell",
    type: ItemType.FUEL,
    category: ItemCategory.CONSUMABLE,
    quantity: 50,
    priceHistory: generatePriceHistory(100),
  },
  {
    id: "food-1",
    name: "Space Rations",
    type: ItemType.FOOD,
    category: ItemCategory.CONSUMABLE,
    quantity: 100,
    priceHistory: generatePriceHistory(100),
  },
  {
    id: "ammo-1",
    name: "Basic Ammunition",
    type: ItemType.AMMO,
    category: ItemCategory.CONSUMABLE,
    quantity: 200,
    priceHistory: generatePriceHistory(100),
  },

  // Zones
  {
    id: "outpost-1",
    name: "Outpost Alpha",
    type: ItemType.OUTPOST_PASS,
    category: ItemCategory.ZONE,
    quantity: 1,
    requiredLevel: 1,
    maxPlayers: 10,
    difficulty: "easy",
    rewards: {
      experience: 100,
      credits: 500,
    },
    priceHistory: generatePriceHistory(100),
  } as ZoneBase,
  {
    id: "outpost-B",
    name: "Outpost B",
    type: ItemType.OUTPOST_PASS,
    category: ItemCategory.ZONE,
    quantity: 1,
    requiredLevel: 1,
    maxPlayers: 10,
    difficulty: "medium",
    rewards: {
      experience: 100,
      credits: 500,
    },
    priceHistory: generatePriceHistory(100),
  } as ZoneBase,

  {
    id: "planet-1",
    name: "Nova Prime",
    type: ItemType.PLANET_PASS,
    category: ItemCategory.ZONE,
    quantity: 1,
    requiredLevel: 5,
    maxPlayers: 20,
    difficulty: "medium",
    rewards: {
      experience: 250,
      credits: 1000,
    },
    priceHistory: generatePriceHistory(100),
  } as ZoneBase,
];
