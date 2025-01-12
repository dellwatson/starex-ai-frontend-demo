// types/inventory.ts
export type ItemRarity = "common" | "uncommon" | "rare" | "epic" | "legendary";
export type ItemType = "material" | "component" | "ship" | "weapon" | "tool";

export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  rarity: ItemRarity;
  imageUrl: string;
  quantity: number;
  equipped?: boolean;
  marketPrice: number;
  priceHistory: { date: string; price: number }[];
  recipe?: {
    materials: Array<{
      itemId: string;
      quantity: number;
    }>;
  };
}

export interface CraftingRecipe {
  resultId: string;
  materials: Array<{
    itemId: string;
    quantity: number;
  }>;
  craftingTime: number; // in seconds
}
