// store/useInventoryStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Item,
  CraftingSlot,
  CraftingClaim,
  CraftingRecipe,
  ItemType,
} from "@/types/inventory.type";
// import { mockItems } from "@/components/product/mock-items";
import { BaseItem } from "@/types/items.interface";
import { mockItems } from "@/components/_mocks/mockItems";

// from recipe: -->
// started time
//

interface InventoryState {
  items: BaseItem[];
  selectedItemId: string | null;
  craftingSlots: CraftingSlot[];
  pendingClaims: CraftingClaim[];
  // Actions
  selectItem: (itemId: string | null) => void;
  removeFromInventory: (itemId: string, quantity: number) => void;
  addToInventory: (item: Item) => void;
  startCrafting: () => void;
  claimCrafted: (claimId: string) => void;
  removeCraftingSlot: (slotId: string) => void;
  //   addCraftingSlot: () => void;
  addCraftingSlot: () => void;
  setItems: (v: any[]) => void;
  removeItems: (v: any[]) => void;
}

export const useInventoryStore = create(
  persist<InventoryState>(
    (set, get) => ({
      items: mockItems,
      selectedItemId: null,
      craftingSlots: [
        { id: "slot1", item: null },
        { id: "slot2", item: null },
      ],
      pendingClaims: [],
      setItems: (v) => set({ items: v }),
      selectItem: (itemId) => set({ selectedItemId: itemId }),

      removeFromInventory: (itemId, quantity) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === itemId
                ? { ...item, quantity: item.quantity - quantity }
                : item
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      removeItems: (items: { type: ItemType; quantity: number }[]) =>
        set((state) => {
          const newItems = [...state.items];
          items.forEach(({ type, quantity }) => {
            const index = newItems.findIndex((item) => item?.type === type);
            if (index !== -1) {
              newItems[index] = {
                ...newItems[index],
                quantity: newItems[index].quantity - quantity,
              };
            }
          });
          return { items: newItems };
        }),

      //   addToInventory: (newItem) => {
      //     console.log(newItem, "newitem");
      //     set((state) => ({
      //       items: state.items.map((item) =>
      //         item.id === newItem.id
      //           ? { ...item, quantity: item.quantity + newItem.quantity }
      //           : item
      //       ),
      //     }));
      //   },
      addToInventory: (newItem) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === newItem.id
          );

          const newState = existingItem
            ? {
                items: state.items.map((item) =>
                  item.id === newItem.id
                    ? { ...item, quantity: item.quantity + newItem.quantity }
                    : item
                ),
              }
            : {
                items: [...state.items, newItem],
              };

          console.log("Inventory updated:", newState.items);
          return newState;
        });
      },

      //   ---------------------- CRAFTING SECTION ----------------------

      addToCraftingSlot: (item) =>
        set((state) => {
          // Find first empty slot
          const emptySlotIndex = state.craftingSlots.findIndex(
            (slot) => slot.item === null
          );

          // If no empty slots and we have the minimum 2 slots filled, create a new slot
          if (emptySlotIndex === -1 && state.craftingSlots.length >= 2) {
            // Create new slot and add item to it
            const newSlot = {
              id: `slot-${state.craftingSlots.length + 1}`,
              item: item,
            };

            return {
              craftingSlots: [...state.craftingSlots, newSlot],
              items: state.items.filter((i) => i.id !== item.id),
              selectedItemId: null,
            };
          }

          // If there's an empty slot, use it
          if (emptySlotIndex !== -1) {
            const newCraftingSlots = [...state.craftingSlots];
            newCraftingSlots[emptySlotIndex] = {
              ...newCraftingSlots[emptySlotIndex],
              item,
            };

            return {
              craftingSlots: newCraftingSlots,
              items: state.items.filter((i) => i.id !== item.id),
              selectedItemId: null,
            };
          }

          return state;
        }),

      removeCraftingSlot: (slotId) =>
        set((state) => {
          // Find the slot and its item
          const slotIndex = state.craftingSlots.findIndex(
            (s) => s.id === slotId
          );
          const slot = state.craftingSlots[slotIndex];

          if (!slot || !slot.item) return state;

          // Add the item back to main inventory
          const newItems = [...state.items, slot.item];

          let newCraftingSlots = [...state.craftingSlots];

          // If it's one of the first two slots (index 0 or 1), just clear the item
          if (slotIndex < 2) {
            newCraftingSlots[slotIndex] = { ...slot, item: null };
          } else {
            // For additional slots (index 2+), remove the entire slot
            newCraftingSlots = newCraftingSlots.filter(
              (_, index) => index !== slotIndex
            );
          }

          return {
            craftingSlots: newCraftingSlots,
            items: newItems,
            selectedItemId: null,
          };
        }),
      //   startCrafting: (recipe) => {
      //     const state = get();
      //     // Check if player has required materials
      //     const canCraft = recipe.materials.every((mat) => {
      //       const item = state.items.find((i) => i.id === mat.itemId);
      //       return item && item.quantity >= mat.quantity;
      //     });

      //     if (canCraft) {
      //       // Remove materials from inventory
      //       recipe.materials.forEach((mat) => {
      //         state.removeFromInventory(mat.itemId, mat.quantity);
      //       });

      //       // Add to pending claims
      //       const claimId = Date.now().toString();
      //       set((state) => ({
      //         pendingClaims: [
      //           ...state.pendingClaims,
      //           {
      //             id: claimId,
      //             recipeId: recipe.resultId,
      //             completionTime: Date.now() + recipe.craftingTime * 1000,
      //           },
      //         ],
      //       }));
      //     }
      //   },
      startCrafting: () =>
        set((state) => {
          if (state.craftingSlots.every((slot) => slot.item)) {
            // Logic for starting crafting
            // Clear both slots after starting craft
            return {
              craftingSlots: state.craftingSlots.map((slot) => ({
                ...slot,
                item: null,
              })),
            };
          }
          return state;
        }),

      claimCrafted: (claimId) => {
        const state = get();
        const claim = state.pendingClaims.find((c) => c.id === claimId);
        if (claim) {
          const recipe = mockRecipes.find((r) => r.resultId === claim.recipeId);
          if (recipe) {
            // Add crafted item to inventory
            state.addToInventory({
              id: recipe.resultId,
              quantity: 1,
              // ... other item properties
            });
            // Remove from pending claims
            set((state) => ({
              pendingClaims: state.pendingClaims.filter(
                (c) => c.id !== claimId
              ),
            }));
          }
        }
      },

      //   removeCraftingSlot: (slotId) => {
      //     set((state) => ({
      //       craftingSlots: state.craftingSlots.filter((slot) => slot.id !== slotId),
      //     }));
      //   },
    }),
    {
      name: "inventory-storage", // unique name for localStorage key
      // Optional configuration
      partialize: (state) => ({
        // Only persist these fields
        items: state.items,
        pendingClaims: state.pendingClaims,
        craftingSlots: state.craftingSlots,
        // Excluding selectedItemId as it's temporary UI state
      }),
    }
  )
);
