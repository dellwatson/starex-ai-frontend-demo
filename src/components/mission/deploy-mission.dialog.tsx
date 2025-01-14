// components/mission/deploy-mission-dialog.tsx
// import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useInventoryStore } from "@/store/inventory-store";
import { useMissionStore } from "@/store/mission.store";
import { useZoneStore } from "@/store/zone.store";
// import { useSpaceshipStore } from "@/store/spaceship.store";
import { ItemType, BaseItem } from "@/types/items.interface";
import { cn } from "@/lib/utils";
import { useSpaceshipStore } from "@/store/spaceship.store";
import { useState } from "react";
import Dialog from "../dialog";

interface RequiredItemProps {
  type: ItemType;
  required: number;
  available: number;
  item?: BaseItem;
  canChange?: boolean;
  onChangeClick?: () => void;
}

export const RequiredItem = ({
  type,
  required,
  available,
  item,
  canChange,
  onChangeClick,
}: RequiredItemProps) => (
  <div className="p-3 rounded-lg border">
    <div className="flex justify-between items-start mb-2">
      <div
        className={cn(
          "w-12 h-12 rounded-md mb-2 overflow-hidden",
          "border-2",
          available < required ? "border-red-500" : "border-green-500"
        )}>
        {item?.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-accent flex items-center justify-center">
            <span className="text-2xl">?</span>
          </div>
        )}
      </div>
      {canChange && (
        <Button
          variant="outline"
          size="sm"
          onClick={onChangeClick}
          disabled // For now
        >
          Change
        </Button>
      )}
    </div>
    <div className="text-sm text-muted-foreground capitalize">
      {type.toLowerCase()}
    </div>
    <div className="font-medium flex items-center gap-2">
      {required} / {available}
      {available < required && <span className="text-red-500">⚠️</span>}
    </div>
  </div>
);

export const DeployMissionDialog = ({ isOpen, onClose }: any) => {
  const inventory = useInventoryStore();
  const selectedZone = useZoneStore((state) => state.selectedZone);

  const selectedShip = useSpaceshipStore((state) => state.selectedShip);
  const deployMission = useMissionStore((state) => state.deployMission);
  const removeItems = useInventoryStore((state) => state.removeItems);

  // Get all required items including spaceship
  const requiredItems = [
    {
      type: ItemType.SPACESHIP,
      required: 1,
      available: selectedShip ? 1 : 0,
      item: selectedShip,
      canChange: true,
    },
    {
      type: ItemType.FOOD,
      required: 1,
      available: 0,
      item: undefined,
    },
    {
      type: ItemType.FUEL,
      required: 1,
      available: 0,
      item: undefined,
    },
    {
      type: ItemType.AMMO,
      required: 1,
      available: 0,
      item: undefined,
    },
  ].map((req) => {
    // if (req.type === ItemType.SPACESHIP) return req;

    const inventoryItem = inventory.items.find(
      (item) => item.type === req.type
    );
    return {
      ...req,
      available: inventoryItem?.quantity || 0,
      item: inventoryItem,
    };
  });

  const handleDeploy = () => {
    // Remove consumables (excluding spaceship)
    removeItems(
      requiredItems
        // .filter((item) => item.type !== ItemType.SPACESHIP)
        .map((item) => ({
          type: item.type,
          quantity: item.required,
        }))
    );

    // Add mission
    deployMission({
      id: Date.now().toString(),
      ship: selectedShip,
      zone: selectedZone,
      status: "active",
      startTime: new Date(),
    });

    onClose();
  };

  const missingRequirements = [
    ...requiredItems.filter((item) => item.available < item.required),
    !selectedZone && { type: "ZONE", message: "No zone selected" },
  ].filter(Boolean);

  const canDeploy = missingRequirements.length === 0;

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Deploy Mission">
      <div className="space-y-6">
        {/* Required Resources */}
        <div className="space-y-3">
          <h3 className="font-medium">Required Resources</h3>

          <div className="grid grid-cols-2 gap-4">
            {requiredItems.map((item) => (
              <RequiredItem
                key={item.type}
                type={item.type}
                required={item.required}
                available={item.available}
                item={item.item}
                canChange={item.canChange}
                onChangeClick={() => {
                  /* TODO: Implement ship selection */
                }}
              />
            ))}
          </div>
        </div>

        {/* Warning Messages */}
        {missingRequirements.length > 0 && (
          <div className="rounded-md bg-yellow-50 p-4">
            <div className="text-sm text-yellow-800">
              {missingRequirements.map((req, index) => (
                <p key={index}>
                  • {req.message || `Not enough ${req.type.toLowerCase()}`}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={handleDeploy}
            disabled={!canDeploy}>
            Deploy Mission
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

// Usage example
export const MissionDialogButton = () => {
  const [isMissionSelectionOpen, setIsMissionSelectionOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsMissionSelectionOpen(true)}>
        Deploy Mission
      </button>

      {isMissionSelectionOpen && (
        <DeployMissionDialog
          isOpen={isMissionSelectionOpen}
          onClose={() => setIsMissionSelectionOpen(false)}
        />
      )}
    </div>
  );
};
