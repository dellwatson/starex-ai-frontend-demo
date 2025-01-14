// components/product/base-detail.tsx
import { BaseItem, Rarity } from "@/types/items.interface";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getRarityBgColor, getRarityColor } from "./rarity";

interface StatBoxProps {
  label: string;
  value: string;
  valueClassName?: string;
}

const StatBox = ({ label, value, valueClassName }: StatBoxProps) => (
  <div className="rounded-lg border p-3">
    <div className="text-sm text-muted-foreground">{label}</div>
    <div className={cn("font-medium", valueClassName)}>{value}</div>
  </div>
);

interface BaseItemDetailProps {
  item: BaseItem;
  renderAttributes?: () => React.ReactNode;
  actionButtons?: React.ReactNode;
}

export const BaseItemDetail = ({
  item,
  renderAttributes,
  actionButtons,
}: BaseItemDetailProps) => {
  return (
    <div className="space-y-6 pb-20">
      {/* Header Section with Large Image and Stats */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Large Image Container */}
        <div className="flex-shrink-0 w-full md:w-[300px]">
          <div
            className="aspect-square rounded-lg border-2 overflow-hidden flex items-center justify-center p-4"
            style={{
              borderColor: getRarityColor(item.rarity),
              backgroundColor: getRarityBgColor(item.rarity),
            }}>
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Info and Stats Container */}
        <div className="flex-1 space-y-4">
          {/* Item Name and Description */}
          <div>
            <h2 className="text-2xl font-bold">{item.name}</h2>
            <p className="text-muted-foreground mt-1">{item.description}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <StatBox label="Type" value={item.type} />
            <StatBox
              label="Rarity"
              value={item.rarity}
              valueClassName={`text-${item.rarity}`}
            />
            <StatBox label="Quantity" value={item.quantity.toString()} />
            {item.marketPrice && (
              <StatBox
                label="Market Price"
                value={`${item.marketPrice.toLocaleString()} credits`}
              />
            )}
          </div>

          {/* Attributes Section */}
          {renderAttributes && (
            <div className="space-y-3">{renderAttributes()}</div>
          )}
        </div>
      </div>
    </div>
  );
};
