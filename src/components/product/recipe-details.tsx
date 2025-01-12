// components/inventory/RecipeDetails.tsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { mockItems, mockRecipes } from "./mock-items";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface RecipeDetailsProps {
  recipeId: string;
}

export function RecipeDetails({ recipeId }: RecipeDetailsProps) {
  const recipe = mockRecipes.find((r) => r.resultId === recipeId);
  const resultItem = mockItems.find((item) => item.id === recipeId);

  if (!recipe || !resultItem) return null;

  const materials = recipe.materials.map((mat) => ({
    ...mat,
    item: mockItems.find((item) => item.id === mat.itemId)!,
  }));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <img src={resultItem.imageUrl} alt="" className="w-6 h-6 mr-2" />
          {recipe.name}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{recipe.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <img
              src={resultItem.imageUrl}
              alt={resultItem.name}
              className="col-span-1 w-full aspect-square object-cover rounded-md"
            />
            <div className="col-span-3">
              <h4 className="font-medium">{resultItem.name}</h4>
              <p className="text-sm text-muted-foreground">
                {resultItem.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Required Materials:</h4>
            <div className="space-y-2">
              {materials.map(({ item, quantity }) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-6 h-6 rounded"
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {quantity} / {item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Crafting Time:</h4>
            <p className="text-sm text-muted-foreground">
              {Math.floor(recipe.craftingTime / 60)}m {recipe.craftingTime % 60}
              s
            </p>
          </div>
        </div>
        <Button
          className="w-full"
          disabled={
            !materials.every(
              (mat) =>
                mockItems.find((item) => item.id === mat.itemId)?.quantity! >=
                mat.quantity
            )
          }>
          Start Crafting
        </Button>
      </DialogContent>
    </Dialog>
  );
}
