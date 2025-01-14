// pages/inventory.tsx
import { PageLayout } from "@/components/layouts/PageLayout";
import { DataTable } from "@/components/ui/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { InventoryLayout } from "@/components/inventory/inventory-layout";
import { Header } from "@/components/container/header";

interface InventoryItem {
  id: string;
  name: string;
  type: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  quantity: number;
  imageUrl: string;
}

const mockInventoryData: InventoryItem[] = [
  {
    id: "1",
    name: "Steel Sword",
    type: "Weapon",
    rarity: "common",
    quantity: 1,
    imageUrl: "/items/sword.png",
  },
  // Add more mock data as needed
];

export default function InventoryPage() {
  return (
    <div className="bg-slate-900 w-full h-full">
      <Header />
      <InventoryLayout />
    </div>
  );
}
