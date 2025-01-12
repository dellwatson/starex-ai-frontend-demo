// components/inventory/ItemDetails.tsx
import { Item } from "@/types/inventory.ts";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ItemDetailsProps {
  item: Item | null;
}

export function ItemDetails({ item }: ItemDetailsProps) {
  if (!item) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Select an item to view details
      </div>
    );
  }

  return (
    <div className="h-full p-6 overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full aspect-square object-cover rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">{item.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Type</div>
                <div className="font-medium">{item.type}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Rarity</div>
                <div className="font-medium">{item.rarity}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">
                  Market Price
                </div>
                <div className="font-medium">{item.marketPrice} credits</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Quantity</div>
                <div className="font-medium">{item.quantity}</div>
              </div>
            </div>

            <div className="h-[200px] mt-6">
              <h3 className="text-sm font-medium mb-2">Price History</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={item.priceHistory}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex gap-2 mt-4">
              {item.equipped ? (
                <Button variant="destructive">Unequip</Button>
              ) : (
                <Button>Equip</Button>
              )}
              <Button variant="outline">Trade</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
