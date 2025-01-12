// components/inventory/InventoryLayout.tsx
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { InventoryList } from "./list";
import { ItemDetails } from "../product/detail";
import { CraftingSection } from "./crafting-section";
import { useState } from "react";
import { type Item } from "@/types/inventory.ts";

export function InventoryLayout() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <div className="h-full">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={40}>
              <InventoryList
                onSelectItem={setSelectedItem}
                selectedItem={selectedItem}
              />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={60}>
              <ItemDetails item={selectedItem} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25}>
          <div className="h-full">
            <div className="hidden md:block h-full">
              <CraftingSection />
            </div>
            <div className="md:hidden p-4 text-center text-muted-foreground">
              Crafting is under construction for mobile devices
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
