// / New types for zone events
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
