// components/inventory/InventoryList.tsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { mockItems } from "@/components/product/mock-items";
import { Item } from "@/types/inventory.ts";

interface InventoryListProps {
  onSelectItem: (item: Item) => void;
  selectedItem: Item | null;
}

export function InventoryList({
  onSelectItem,
  selectedItem,
}: InventoryListProps) {
  const [search, setSearch] = useState("");

  const filteredItems = mockItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col p-4">
      <Input
        placeholder="Search items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <ScrollArea className="flex-1">
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`p-2 rounded-lg border cursor-pointer transition-colors ${
                selectedItem?.id === item.id
                  ? "bg-accent border-accent-foreground"
                  : "hover:bg-accent/50"
              }`}
              onClick={() => onSelectItem(item)}>
              <div className="aspect-square relative mb-2">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="object-cover rounded-md"
                />
                {item.equipped && (
                  <span className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1 rounded">
                    Equipped
                  </span>
                )}
              </div>
              <div className="text-sm font-medium truncate">{item.name}</div>
              <div className="text-xs text-muted-foreground">
                Qty: {item.quantity}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
