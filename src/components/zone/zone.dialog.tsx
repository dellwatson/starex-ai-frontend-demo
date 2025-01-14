// components/ZoneSelection/index.tsx
import { useState } from "react";
import Dialog from "../dialog";
import { useInventoryStore } from "@/store/inventory-store";
import { ItemType, ItemCategory, ZoneBase } from "@/types/items.interface";
import usePlayMatchStore from "@/store/play-mission.store";
import { ZoneList, ZoneSelection } from "./zone-list";
// import styles from "./ZoneSelection.module.css";

interface ZoneSelectionProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ZoneDialog = ({ isOpen, onClose }: ZoneSelectionProps) => {
  // const [activeTab, setActiveTab] = useState<"outpost" | "planet" | "dungeon">(
  //   "outpost"
  // );

  // const { items: inventory } = useInventoryStore();

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Select Zone">
      <ZoneList
        {...{
          isOpen,
          onClose,
        }}
      />
    </Dialog>
  );
};

// Usage example
export const ZoneDialogButton = () => {
  const [isZoneSelectionOpen, setIsZoneSelectionOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsZoneSelectionOpen(true)}>Select Zone</button>

      {isZoneSelectionOpen && (
        <ZoneDialog
          isOpen={isZoneSelectionOpen}
          onClose={() => setIsZoneSelectionOpen(false)}
        />
      )}
    </div>
  );
};
