import { ItemRarity } from "@/types/inventory.type";

// Helper function to get rarity colors
export const getRarityColor = (rarity: ItemRarity) => {
  const colors = {
    common: "#e5e7eb", // gray-200
    uncommon: "#86efac", // green-200
    rare: "#93c5fd", // blue-200
    epic: "#c084fc", // purple-200
    legendary: "#fdba74", // orange-200
  };
  return colors[rarity];
};

export const getRarityBgColor = (rarity: ItemRarity) => {
  const colors = {
    common: "#f9fafb", // gray-50
    uncommon: "#f0fdf4", // green-50
    rare: "#eff6ff", // blue-50
    epic: "#faf5ff", // purple-50
    legendary: "#fff7ed", // orange-50
  };
  return colors[rarity];
};
