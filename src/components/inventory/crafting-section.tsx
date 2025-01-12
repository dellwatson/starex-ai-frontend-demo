// components/inventory/CraftingSection.tsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { mockRecipes } from "@/components/product/mock-items";
import { Progress } from "@/components/ui/progress";

export function CraftingSection() {
  return (
    <div className="h-full p-4">
      <div className="grid grid-cols-3 gap-4 h-full">
        <div className="col-span-2 border rounded-lg p-4">
          <h3 className="font-medium mb-4">Crafting Slots</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 aspect-square flex items-center justify-center">
              <span className="text-muted-foreground">Empty Slot</span>
            </div>
            <div className="border rounded-lg p-4 aspect-square">
              <div className="h-full flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                  Crafting: Quantum Core
                </div>
                <Progress value={33} className="w-full" />
                <div className="text-xs text-center mt-2">2:30 remaining</div>
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Available Recipes</h3>
          <div className="space-y-4">
            {mockRecipes.map((recipe) => (
              <Button
                key={recipe.resultId}
                variant="outline"
                className="w-full justify-start">
                {recipe.name}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
