import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { ZoneBase } from "@/types/items.interface";
import { mockItems } from "@/components/_mocks/mockItems";
import { ItemType } from "../types/items.interface";

// New types for zone events
type EventType = "DANGER" | "RESOURCE" | "BATTLE" | "DISCOVERY";

interface ZoneEvent {
  id: string;
  type: EventType;
  description: string;
  timestamp: number;
  expires?: number; // Optional expiration timestamp
  severity?: "low" | "medium" | "high";
  rewards?: { type: string; quantity: number }[];
}

interface ZoneData {
  id: string;
  events: ZoneEvent[];
  fleetCount: number;
  lastUpdated: number;
}

interface ZoneState {
  selectedZone: ZoneBase | null;
  zonesData: Record<string, ZoneData>; // Store data for each zone
  setSelectedZone: (zone: ZoneBase | null) => void;
  addEvent: (zoneId: string, event: Omit<ZoneEvent, "id">) => void;
  removeEvent: (zoneId: string, eventId: string) => void;
  updateFleetCount: (zoneId: string, delta: number) => void;
  getZoneEvents: (zoneId: string) => ZoneEvent[];
  cleanupExpiredEvents: () => void;
}

// Mock fleet data API
const fetchInitialFleetCount = async (zoneId: string) => {
  // Simulate API call
  return Math.floor(Math.random() * 100) + 20;
};

export const useZoneStore = create<ZoneState>()(
  persist(
    devtools(
      (set, get) => ({
        selectedZone: null,
        zonesData: {},

        setSelectedZone: (zone) => set({ selectedZone: zone }),

        addEvent: (zoneId, event) =>
          set((state) => {
            const zoneData = state.zonesData[zoneId] || {
              id: zoneId,
              events: [],
              fleetCount: 0,
              lastUpdated: Date.now(),
            };

            const newEvent = {
              ...event,
              id: crypto.randomUUID(),
              timestamp: Date.now(),
            };

            return {
              zonesData: {
                ...state.zonesData,
                [zoneId]: {
                  ...zoneData,
                  events: [...zoneData.events, newEvent],
                  lastUpdated: Date.now(),
                },
              },
            };
          }),

        removeEvent: (zoneId, eventId) =>
          set((state) => {
            const zoneData = state.zonesData[zoneId];
            if (!zoneData) return state;

            return {
              zonesData: {
                ...state.zonesData,
                [zoneId]: {
                  ...zoneData,
                  events: zoneData.events.filter((e) => e.id !== eventId),
                  lastUpdated: Date.now(),
                },
              },
            };
          }),

        updateFleetCount: (zoneId, delta) =>
          set((state) => {
            const zoneData = state.zonesData[zoneId] || {
              id: zoneId,
              events: [],
              fleetCount: 0,
              lastUpdated: Date.now(),
            };

            return {
              zonesData: {
                ...state.zonesData,
                [zoneId]: {
                  ...zoneData,
                  fleetCount: Math.max(0, zoneData.fleetCount + delta),
                  lastUpdated: Date.now(),
                },
              },
            };
          }),

        getZoneEvents: (zoneId) => {
          const state = get();
          return state.zonesData[zoneId]?.events || [];
        },

        cleanupExpiredEvents: () =>
          set((state) => {
            const now = Date.now();
            const updatedZonesData = { ...state.zonesData };

            Object.keys(updatedZonesData).forEach((zoneId) => {
              updatedZonesData[zoneId] = {
                ...updatedZonesData[zoneId],
                events: updatedZonesData[zoneId].events.filter(
                  (event) => !event.expires || event.expires > now
                ),
              };
            });

            return { zonesData: updatedZonesData };
          }),
      }),
      {
        name: "zone-store",
      }
    ),
    {
      name: "zone-storage",
      partialize: (state) => ({
        zonesData: state.zonesData, // Only persist zonesData
      }),
    }
  )
);

// // Helper function to generate random events
// export const generateRandomEvent = (): Omit<ZoneEvent, "id"> => {
//   const eventTypes: EventType[] = ["DANGER", "RESOURCE", "BATTLE", "DISCOVERY"];
//   const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];

//   const events = {
//     DANGER: [
//       "Asteroid field detected",
//       "Solar flare warning",
//       "Space debris ahead",
//     ],
//     RESOURCE: [
//       "Rare mineral deposit found",
//       "Abandoned cargo detected",
//       "Resource-rich asteroid nearby",
//     ],
//     BATTLE: [
//       "Pirates spotted",
//       "Territory dispute",
//       "Hostile fleet approaching",
//     ],
//     DISCOVERY: [
//       "Unknown signal detected",
//       "Ancient ruins found",
//       "Mysterious anomaly",
//     ],
//   };

//   return {
//     type,
//     description: events[type][Math.floor(Math.random() * events[type].length)],
//     timestamp: Date.now(),
//     expires: Date.now() + Math.random() * 3600000, // Random expiration within 1 hour
//     severity: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as
//       | "low"
//       | "medium"
//       | "high",
//   };
// };

interface EventReward {
  type: string;
  quantity: number;
  rarity?: "common" | "uncommon" | "rare" | "epic" | "legendary";
}

// Expanded event configuration
const EVENT_CONFIG = {
  DANGER: {
    descriptions: [
      "Asteroid field detected - Immediate evasive action required",
      "Solar flare warning - Shield systems recommended",
      "Space debris ahead - Navigation hazard",
      "Gravitational anomaly detected - Course correction needed",
      "Radiation storm approaching - Seek shelter",
      "Micro-meteoroid shower incoming - Brace for impact",
      "Hull breach risk - Environmental hazard",
      "Unstable wormhole detected - Safe distance advised",
      "Cosmic ray burst - Radiation protection required",
      "Dark matter surge - Systems interference likely",
    ],
    baseRewards: [
      { type: "Shield Fragments", baseQuantity: 5 },
      { type: "Repair Kits", baseQuantity: 3 },
      { type: "Emergency Supplies", baseQuantity: 2 },
    ],
    duration: { min: 30000, max: 120000 }, // 30s to 2m
  },
  RESOURCE: {
    descriptions: [
      "Rare mineral deposit found - Rich in crystalline formations",
      "Abandoned cargo detected - Salvage opportunity",
      "Resource-rich asteroid nearby - Mining potential",
      "Derelict station discovered - Resources available",
      "Exotic matter concentration - Harvesting possible",
      "Gas cloud containing valuable elements",
      "Pristine ore deposits detected",
      "Ancient technology cache located",
      "Rare isotope signature detected",
      "Valuable space debris field identified",
    ],
    baseRewards: [
      { type: "Minerals", baseQuantity: 10 },
      { type: "Crystals", baseQuantity: 8 },
      { type: "Rare Elements", baseQuantity: 5 },
      { type: "Salvage Parts", baseQuantity: 15 },
    ],
    duration: { min: 45000, max: 180000 }, // 45s to 3m
  },
  BATTLE: {
    descriptions: [
      "Pirates spotted - Combat engagement likely",
      "Territory dispute - Hostile forces present",
      "Hostile fleet approaching - Battle stations",
      "Raider squadron detected - Combat alert",
      "Enemy blockade established - Conflict imminent",
      "Mercenary ambush - Defensive measures advised",
      "Rival faction patrol - Combat possible",
      "Space pirates staging area discovered",
      "Enemy reinforcements incoming",
      "Tactical combat situation developing",
    ],
    baseRewards: [
      { type: "Combat Tokens", baseQuantity: 7 },
      { type: "Battle Salvage", baseQuantity: 12 },
      { type: "Weapon Parts", baseQuantity: 4 },
      { type: "Combat Experience", baseQuantity: 100 },
    ],
    duration: { min: 60000, max: 240000 }, // 1m to 4m
  },
  DISCOVERY: {
    descriptions: [
      "Unknown signal detected - Origin mysterious",
      "Ancient ruins found - Archaeological significance",
      "Mysterious anomaly - Scientific opportunity",
      "Uncharted space phenomenon observed",
      "Alien artifact detected - Research potential",
      "Temporal distortion discovered",
      "Unknown technology signature",
      "Cryptic transmission received",
      "Unexplored stellar phenomenon",
      "Ancient space station discovered",
    ],
    baseRewards: [
      { type: "Research Data", baseQuantity: 20 },
      { type: "Artifact Fragments", baseQuantity: 3 },
      { type: "Discovery Points", baseQuantity: 50 },
      { type: "Ancient Technology", baseQuantity: 2 },
    ],
    duration: { min: 90000, max: 300000 }, // 1.5m to 5m
  },
};

// Helper function to calculate reward quantity based on severity
const calculateRewardQuantity = (
  baseQuantity: number,
  severity: "low" | "medium" | "high"
): number => {
  const multiplier = {
    low: 1,
    medium: 1.5,
    high: 2.5,
  }[severity];
  return Math.floor(baseQuantity * multiplier);
};

// Generate random rewards based on event type and severity
const generateRewards = (
  type: EventType,
  severity: "low" | "medium" | "high"
): EventReward[] => {
  const config = EVENT_CONFIG[type];
  const numRewards = Math.floor(Math.random() * 2) + 1; // 1-2 rewards

  return config.baseRewards
    .sort(() => Math.random() - 0.5)
    .slice(0, numRewards)
    .map((reward) => ({
      type: reward.type,
      quantity: calculateRewardQuantity(reward.baseQuantity, severity),
      rarity:
        severity === "high"
          ? "rare"
          : severity === "medium"
          ? "uncommon"
          : "common",
    }));
};

export const generateRandomEvent = (): Omit<ZoneEvent, "id"> => {
  const eventTypes: EventType[] = ["DANGER", "RESOURCE", "BATTLE", "DISCOVERY"];
  const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
  const severity = ["low", "medium", "high"][Math.floor(Math.random() * 3)] as
    | "low"
    | "medium"
    | "high";

  const config = EVENT_CONFIG[type];
  const description =
    config.descriptions[Math.floor(Math.random() * config.descriptions.length)];

  // Calculate random duration within configured range
  const duration = Math.floor(
    Math.random() * (config.duration.max - config.duration.min) +
      config.duration.min
  );

  return {
    type,
    description,
    timestamp: Date.now(),
    expires: Date.now() + duration,
    severity,
    rewards: generateRewards(type, severity),
  };
};

// Function to periodically generate new events
export const setupEventGenerator = (zoneId: string) => {
  const generateNewEvent = () => {
    const shouldGenerate = Math.random() < 0.7; // 70% chance to generate an event
    if (shouldGenerate) {
      const event = generateRandomEvent();
      useZoneStore.getState().addEvent(zoneId, event);
    }
  };

  // Generate events every 2-4 seconds
  const interval = setInterval(() => {
    generateNewEvent();
  }, 2000 + Math.random() * 2000);

  return () => clearInterval(interval); // Cleanup function
};

// // Usage in your component:
// useEffect(() => {
//   if (selectedZone) {
//     const cleanup = setupEventGenerator(selectedZone.id);
//     return () => cleanup();
//   }
// }, [selectedZone]);

// Initialize zone with data
export async function initializeZone(zoneId: string) {
  const store = useZoneStore.getState();

  // Only initialize if zone doesn't exist
  if (!store.zonesData[zoneId]) {
    const initialFleetCount = await fetchInitialFleetCount(zoneId);

    // Add initial random events
    const initialEvents = Array(3)
      .fill(null)
      .map(() => ({
        ...generateRandomEvent(),
        id: crypto.randomUUID(),
      }));

    store.updateFleetCount(zoneId, initialFleetCount);
    initialEvents.forEach((event) => {
      store.addEvent(zoneId, event);
    });
  }
}

// Example usage:
// initializeZone('zone1');
// useZoneStore.getState().addEvent('zone1', generateRandomEvent());
// useZoneStore.getState().updateFleetCount('zone1', 5);
