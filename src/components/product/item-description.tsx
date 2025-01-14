// components/inventory/ItemDetails.tsx
import { useInventoryStore } from "@/store/inventory-store";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ItemBox } from "./item-box";
import { cn } from "@/lib/utils";
import { ItemRarity } from "@/types/inventory.type";

// components/product/item-description.tsx
import { BaseItemDetail } from "./base-detail";
import { BaseItem, ItemType } from "@/types/items.interface";
import { AttributeItem } from "../ui/attribute-item";

export interface ItemAttribute {
  name: string;
  value: number | string;
  type: "positive" | "negative" | "neutral";
}

export const ItemDescription = (
  {} // item,
) =>
  // isInCraftingSlots,
  // onAddToCrafting,
  {
    const renderAttributes = () => {
      switch (item.type) {
        case ItemType.SPACESHIP:
          return (
            <div className="grid grid-cols-2 gap-2">
              <AttributeItem
                label="Health"
                value={`${item.health}/${item.maxHealth}`}
              />
              <AttributeItem
                label="Shield"
                value={`${item.shield}/${item.maxShield}`}
              />
              <AttributeItem label="Speed" value={item.speed} />
              <AttributeItem label="Capacity" value={item.capacity} />
            </div>
          );

        case ItemType.OUTPOST_PASS:
        case ItemType.PLANET_PASS:
        case ItemType.DUNGEON_KEY:
          return (
            <div className="space-y-2">
              <AttributeItem
                label="Required Level"
                value={item.requiredLevel}
              />
              <AttributeItem label="Max Players" value={item.maxPlayers} />
              <AttributeItem label="Difficulty" value={item.difficulty} />
            </div>
          );

        // Add cases for other item types
        default:
          return null;
      }
    };

    const { selectedItemId, items, addToCraftingSlot, craftingSlots } =
      useInventoryStore();
    const item = items.find((i) => i.id === selectedItemId);

    // Check if this item is already in crafting slots
    const isInCraftingSlots = craftingSlots.some(
      (slot) => slot.item?.id === selectedItemId
    );

    return (
      <div className="h-full p-6 overflow-auto">
        <BaseItemDetail
          item={item}
          renderAttributes={renderAttributes}
          // actionButtons={actionButtons}
        />
        {/* Price History Chart */}
        <div className="space-y-2">
          <h3 className="font-medium">Price History</h3>
          <div className="h-[200px] border rounded-lg p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={item?.priceHistory}>
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                  formatter={(value) => [`${value} credits`, "Price"]}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={() => addToCraftingSlot(item)}
            disabled={isInCraftingSlots}
            variant={isInCraftingSlots ? "outline" : "default"}>
            {isInCraftingSlots ? "Already in Crafting" : "Add to Crafting"}
          </Button>
          <Button variant="outline">Trade</Button>
        </div>

        {/* Recipe Section (if applicable) */}
        {item.recipe && (
          <div className="space-y-2">
            <h3 className="font-medium">Crafting Guide: AI</h3>
            <div className="border rounded-lg p-4">
              <div className="flex flex-wrap gap-4">
                {item.recipe.materials.map((material) => {
                  const materialItem = items.find(
                    (i) => i.id === material.itemId
                  );
                  if (!materialItem) return null;

                  return (
                    <div key={material.itemId} className="text-center">
                      <ItemBox item={materialItem} className="mb-1" />
                      <span className="text-sm text-muted-foreground">
                        x{material.quantity}
                      </span>
                    </div>
                  );
                })}
              </div>
              <Button className="w-full mt-4">Add to Crafting</Button>
            </div>
          </div>
        )}
      </div>
    );
  };

// // StatBox component remains the same
// function StatBox({
//   label,
//   value,
//   valueClassName,
// }: {
//   label: string;
//   value: string;
//   valueClassName?: string;
// }) {
//   return (
//     <div className="border rounded-lg p-3">
//       <div className="text-sm text-muted-foreground">{label}</div>
//       <div className={cn("font-medium capitalize", valueClassName)}>
//         {value}
//       </div>
//     </div>
//   );
// }
