// stores/spaceship.store.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { BaseItem, ItemType } from "@/types/items.interface";

interface SpaceshipState {
  selectedShip: BaseItem | null;
  setSelectedShip: (ship: BaseItem | null) => void;
  // Helper function to check if an item is a valid ship
  isValidShip: (item: BaseItem) => boolean;
}

export const useSpaceshipStore = create<SpaceshipState>()(
  devtools(
    (set, get) => ({
      selectedShip: null, // Will be set to default ship during initialization

      setSelectedShip: (ship) => {
        if (ship && !get().isValidShip(ship)) {
          console.error("Invalid ship type");
          return;
        }
        set({ selectedShip: ship });
      },

      isValidShip: (item: BaseItem) => {
        return item.type === ItemType.SPACESHIP;
      },
    }),
    {
      name: "spaceship-store",
    }
  )
);

// Initialize with default ship (you can do this in your app initialization)
export const initializeDefaultShip = (defaultShip: BaseItem) => {
  if (useSpaceshipStore.getState().isValidShip(defaultShip)) {
    useSpaceshipStore.getState().setSelectedShip(defaultShip);
  } else {
    console.error("Invalid default ship");
  }
};

// Optional: Add some helper hooks for common operations
export const useSelectedShip = () =>
  useSpaceshipStore((state) => state.selectedShip);
export const useSetSelectedShip = () =>
  useSpaceshipStore((state) => state.setSelectedShip);
