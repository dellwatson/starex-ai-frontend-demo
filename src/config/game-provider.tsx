// app/init.ts
import { initializeDefaultShip } from "@/store/spaceship.store";
import { initializeZone } from "@/store/zone.store";
import { useInventoryStore } from "@/store/inventory-store";
import { ItemType } from "../types/items.interface";
import { mockItems } from "../components/_mocks/mockItems";
import { useEffect } from "react";
import { useSpaceshipStore } from "@/store/spaceship.store";
import { useZoneStore } from "@/store/zone.store";

// providers/game-provider.tsx
// import { useEffect } from 'react';
// import { mockItems } from '@/mocks/mockItems';
// import { ItemType } from '@/types/items.interface';
// import { useInventoryStore } from '@/stores/inventory.store';

function initializeGameState() {
  const inventory = useInventoryStore.getState();
  const setSelectedShip = useSpaceshipStore.getState().setSelectedShip;
  const setSelectedZone = useZoneStore.getState().setSelectedZone;

  // First, initialize inventory
  // inventory?.setItems(mockItems);

  // Then set default ship and zone from inventory
  const defaultShip = inventory.items.find(
    (item) => item.type === ItemType.SPACESHIP
  );
  if (defaultShip) {
    setSelectedShip(defaultShip);
  }

  const defaultZone = inventory.items.find(
    (item) => item.type === ItemType.OUTPOST_PASS
  );
  if (defaultZone) {
    setSelectedZone(defaultZone);
    initializeZone(defaultZone?.id);
  }
}

export function GameProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initializeGameState();
    // initializeZone()
  }, []);

  return <>{children}</>;
}
