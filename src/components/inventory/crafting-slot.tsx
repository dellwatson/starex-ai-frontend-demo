// components/inventory/crafting-slot.tsx
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ItemBox } from "../product/item-box";
import { Item } from "@/types/inventory.type";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// components/inventory/crafting-slot.tsx
interface CraftingSlotProps {
  item?: Item | null;
  onRemove?: () => void;
  isAddSlot?: boolean;
  onAdd?: () => void;
  slotNumber: number;
}

export function CraftingSlot({
  item,
  onRemove,
  isAddSlot,
  onAdd,
  slotNumber,
}: CraftingSlotProps) {
  if (isAddSlot) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="w-[100px] h-[100px] border-2 border-dashed"
              onClick={onAdd}>
              <Plus className="h-6 w-6" />
              <span className="sr-only">Add slot {slotNumber}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add new crafting slot</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (!item) {
    return (
      <div className="relative">
        <div className="w-[100px] h-[100px] border-2 border-dashed rounded-lg flex items-center justify-center">
          <span className="text-muted-foreground text-sm">
            Slot {slotNumber}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <ItemBox item={item} showTooltip />
      {onRemove && (
        <Button
          variant="destructive"
          size="sm"
          className="absolute -bottom-2 -right-2 h-6 w-6 p-0"
          onClick={() => {
            // This will trigger removeCraftingSlot which returns the item to inventory
            onRemove();
          }}>
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}
