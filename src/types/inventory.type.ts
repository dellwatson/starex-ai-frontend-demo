// types/inventory.ts
export type ItemRarity = "common" | "uncommon" | "rare" | "epic" | "legendary";
export type ItemType =
  | "material"
  | "component"
  | "ship"
  | "weapon"
  | "tool"
  | "consumable";

export interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
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

export interface CraftingSlot {
  id: string;
  item: Item;
  recipe?: CraftingRecipe;
  startTime?: number; // timestamp when crafting started
  status: "empty" | "crafting" | "ready";
}

export interface CraftingClaim {
  id: string;
  recipeId: string;
  completionTime: number; // timestamp in milliseconds
  materials: Array<{
    itemId: string;
    quantity: number;
  }>;
  status: "processing" | "ready" | "claimed";
  startedAt: number; // timestamp when crafting started
  claimedAt?: number; // timestamp when item was claimed
}

// Optional: You might also want these types for better type safety
export interface InventoryState {
  items: Item[];
  selectedItemId: string | null;
  craftingSlots: CraftingSlot[];
  pendingClaims: CraftingClaim[];
}

export interface CraftingAction {
  type: "START_CRAFT" | "CLAIM_ITEM" | "REMOVE_SLOT" | "ADD_SLOT";
  payload: {
    slotId?: string;
    recipeId?: string;
    claimId?: string;
    materials?: Array<{
      itemId: string;
      quantity: number;
    }>;
  };
}
