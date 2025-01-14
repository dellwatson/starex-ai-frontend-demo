// mocks/mockRewards.ts
import { ItemType, ItemCategory } from "@/types/items.interface";
import { generatePriceHistory } from "./mockItems";

export const mockRewards = [
  {
    id: "material-1",
    name: "Common Metal Ore",
    type: ItemType.MATERIAL,
    category: ItemCategory.RESOURCE,
    quantity: 0,
    priceHistory: generatePriceHistory(50),
  },
  {
    id: "material-2",
    name: "Rare Crystal",
    type: ItemType.MATERIAL,
    category: ItemCategory.RESOURCE,
    quantity: 0,
    priceHistory: generatePriceHistory(200),
  },
  // ... add more materials with varying rarity/value
  {
    id: "material-20",
    name: "Ancient Technology Fragment",
    type: ItemType.MATERIAL,
    category: ItemCategory.RESOURCE,
    quantity: 0,
    priceHistory: generatePriceHistory(1000),
  },
];
