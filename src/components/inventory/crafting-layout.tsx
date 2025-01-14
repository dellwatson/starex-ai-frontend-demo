// components/inventory/CraftingSection.tsx
import { Button } from "@/components/ui/button";
import { useInventoryStore } from "@/store/inventory-store";
import { CraftingSlot } from "./crafting-slot";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";

// Helper functions for time and recipe name formatting
export const getRecipeName = (recipeId: string): string => {
  // TODO: Replace with actual recipe data from your store
  return `Recipe #${recipeId}`;
};

export const formatTimeRemaining = (ms: number): string => {
  if (ms <= 0) return "Ready to claim!";

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
};

export function CraftingLayout() {
  const {
    pendingClaims,
    craftingSlots,
    claimCrafted,
    removeCraftingSlot,
    startCrafting,
  } = useInventoryStore();

  // Check if both slots are filled
  const canCraft =
    craftingSlots.length <= 2 &&
    craftingSlots.every((slot) => slot.item !== null);

  console.log(craftingSlots, "craftingSlots");

  return (
    <div className="h-full p-4 bg-orange-500">
      <div className="grid grid-cols-2 gap-4 h-full pb-20">
        {/* Crafting Slots */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Crafting Slots</h3>
            <Button
              className=""
              disabled={!canCraft}
              onClick={() => startCrafting()}>
              Craft Item
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {Array.from({ length: Math.max(2, craftingSlots.length) }).map(
              (_, index) => (
                <>
                  <CraftingSlot
                    key={craftingSlots[index]?.id || `empty-${index}`}
                    slotNumber={index + 1}
                    item={craftingSlots[index]?.item || null}
                    onRemove={
                      craftingSlots[index]
                        ? () => removeCraftingSlot(craftingSlots[index].id)
                        : undefined
                    }
                  />
                  {/* Add plus icon between slots */}
                  {index < Math.max(2, craftingSlots.length) - 1 && (
                    <div className="flex items-center justify-center w-8 h-8">
                      <Plus className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </>
              )
            )}

            {/* Add new slot button at the end */}
            {/* <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8">
                  <Plus className="w-6 h-6 text-muted-foreground" />
                </div>
                <CraftingSlot
                  isAddSlot
                  slotNumber={Math.max(2, craftingSlots.length) + 1}
                  onAdd={() => addCraftingSlot()}
                />
              </div> */}
          </div>
        </div>

        {/* Crafting progress: Pending Claims */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Crafting Progress</h3>
          <ScrollArea className="h-[200px]">
            <div className="space-y-2">
              {pendingClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <div className="font-medium">
                      {getRecipeName(claim.recipeId)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatTimeRemaining(claim.completionTime - Date.now())}
                    </div>
                  </div>
                  <Button
                    onClick={() => claimCrafted(claim.id)}
                    disabled={Date.now() < claim.completionTime}>
                    Claim
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

// Helper functions remain the same
