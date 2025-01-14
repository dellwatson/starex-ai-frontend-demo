// components/inventory/InventoryList.tsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useInventoryStore } from "@/store/inventory-store";
import { ItemBox } from "../product/item-box";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "name" | "rarity" | "type" | "quantity";

export function InventoryList() {
  // Use specific selector to prevent unnecessary re-renders
  const items = useInventoryStore((state) => state.items);
  const selectedItemId = useInventoryStore((state) => state.selectedItemId);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("name");

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "rarity":
        const rarityOrder = {
          legendary: 5,
          epic: 4,
          rare: 3,
          uncommon: 2,
          common: 1,
        };
        return rarityOrder[b.rarity] - rarityOrder[a.rarity];
      case "type":
        return a.type.localeCompare(b.type);
      case "quantity":
        return b.quantity - a.quantity;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="h-full flex flex-col p-4 bg-black">
      <div className="space-y-4 mb-4">
        <Input
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
        <Select
          value={sortBy}
          onValueChange={(value) => setSortBy(value as SortOption)}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="rarity">Rarity</SelectItem>
            <SelectItem value="type">Type</SelectItem>
            <SelectItem value="quantity">Quantity</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="flex-1 w-full ">
        <div className="flex flex-wrap gap-2 pt-2 pr-2 pl-1 pb-20">
          {[...sortedItems].map((item) => (
            <ItemBox
              key={item.id}
              item={item}
              isSelected={item.id === selectedItemId}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
