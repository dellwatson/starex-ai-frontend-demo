// components/inventory/item-box.tsx
import { Item, ItemRarity } from "@/types/inventory.type";
import { cn } from "@/lib/utils";
import { useInventoryStore } from "@/store/inventory-store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ItemBoxProps {
  item: Item;
  isSelected?: boolean;
  onClick?: () => void;
  showTooltip?: boolean;
  className?: string;
}

const rarityConfig: Record<ItemRarity, { border: string; background: string }> =
  {
    common: {
      border: "border-gray-200",
      background: "bg-gray-50",
    },
    uncommon: {
      border: "border-green-200",
      background: "bg-green-50",
    },
    rare: {
      border: "border-blue-200",
      background: "bg-blue-50",
    },
    epic: {
      border: "border-purple-200",
      background: "bg-purple-50",
    },
    legendary: {
      border: "border-orange-200",
      background: "bg-orange-50",
    },
  };

export function ItemBox({
  item,
  isSelected,
  onClick,
  showTooltip = true,
  className,
}: ItemBoxProps) {
  const { selectItem } = useInventoryStore();

  const handleClick = () => {
    onClick?.();
    selectItem(item.id); // should select the whole data here too
  };

  const ItemContent = (
    <div
      className={cn(
        "w-[100px] h-[100px] p-2 rounded-lg border-2 cursor-pointer transition-all",
        rarityConfig[item.rarity]?.border,
        rarityConfig[item.rarity]?.background,
        isSelected && "ring-2 ring-primary",
        className
      )}
      onClick={handleClick}>
      <div className="relative h-full flex flex-col items-center">
        <div className="flex-1 flex items-center justify-center">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="object-contain max-h-[60px] max-w-full"
          />
        </div>
        <div className="w-full text-center mt-1">
          {/* <div className="text-xs font-medium truncate">{item.name}</div> */}
          <div className="text-xs text-muted-foreground">x{item.quantity}</div>
        </div>
        {item.equipped && (
          <div className="absolute top-0 right-0">
            <span className="bg-green-500 text-white text-[10px] px-1 rounded">
              Equipped
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (!showTooltip) return ItemContent;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{ItemContent}</TooltipTrigger>
        <TooltipContent side="top">
          <div className="space-y-1">
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.description}</p>
            <p className="text-xs capitalize">
              {item.rarity} {item.type}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
