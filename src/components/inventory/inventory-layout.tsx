// components/inventory/InventoryLayout.tsx
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { InventoryList } from "./list";
import { CraftingLayout } from "./crafting-layout";
import { useInventoryStore } from "@/store/inventory-store";
import { BaseItemDetail } from "../product/base-detail";
import { ItemDescription } from "../product/item-description";

export function InventoryLayout() {
  const { selectedItemId } = useInventoryStore();
  //   console.log(selectedItemId, "selectedItemId");

  return (
    <div className="h-full">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={75}>
          {selectedItemId ? (
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={40}>
                <InventoryList />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={60}>
                <ItemDescription />
              </ResizablePanel>
            </ResizablePanelGroup>
          ) : (
            <InventoryList />
          )}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25}>
          <CraftingLayout />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
