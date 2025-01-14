// components/ZoneList/index.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInventoryStore } from "@/store/inventory-store";
import usePlayMatchStore from "@/store/play-mission.store";
import { ItemType, ItemCategory, ZoneBase } from "@/types/items.interface";
import { cn } from "@/lib/utils";
import { ZoneDescription } from "./zone-description";
// components/zone/zone-list.tsx
import { useState } from "react";
import { useZoneStore } from "@/store/zone.store";
import { Badge } from "../ui/badge";
// import { Badge } from "lucide-react";

interface ZoneListProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ZoneList = ({ isOpen, onClose }: ZoneListProps) => {
  const [viewingZone, setViewingZone] = useState<ZoneBase | null>(null);
  const selectedZone = useZoneStore((state) => state.selectedZone);
  const { items: inventory } = useInventoryStore();

  const zones = inventory.filter((item) => item.category === ItemCategory.ZONE);

  const zonesByType = {
    outpost: zones.filter((zone) => zone.type === ItemType.OUTPOST_PASS),
    planet: zones.filter((zone) => zone.type === ItemType.PLANET_PASS),
    dungeon: zones.filter((zone) => zone.type === ItemType.DUNGEON_KEY),
  };

  const handleZoneSelect = (zone: ZoneBase) => {
    setViewingZone(zone);
  };

  return (
    <>
      {viewingZone ? (
        <ZoneDescription
          zone={viewingZone}
          onBack={() => setViewingZone(null)}
          onClose={onClose}
        />
      ) : (
        <Tabs defaultValue="outpost" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="outpost">Outposts</TabsTrigger>
            <TabsTrigger value="planet">Planets</TabsTrigger>
            <TabsTrigger value="dungeon">Dungeons</TabsTrigger>
          </TabsList>

          {Object.entries(zonesByType).map(([type, zones]) => (
            <TabsContent key={type} value={type}>
              <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                {zones.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <p>No {type} zones available</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {zones.map((zone) => (
                      <button
                        key={zone.id}
                        onClick={() => setViewingZone(zone)}
                        className={cn(
                          "text-left w-full rounded-lg border p-4",
                          "hover:border-primary/50 transition-colors",
                          "focus:outline-none focus:ring-2 focus:ring-primary/50",
                          selectedZone?.id === zone.id &&
                            "border-primary ring-2 ring-primary/50"
                        )}>
                        {zone.imageUrl && (
                          <div className="relative w-full aspect-video rounded-md overflow-hidden mb-4">
                            <img
                              src={zone.imageUrl}
                              alt={zone.name}
                              className="object-cover"
                            />
                          </div>
                        )}

                        <div className="space-y-2">
                          <h3 className="font-semibold">{zone.name}</h3>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Level {zone.requiredLevel}</span>
                            <span>•</span>
                            <span className="capitalize">
                              {zone.difficulty}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-500">💰</span>
                              <span>{zone.rewards.credits}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-blue-500">✨</span>
                              <span>{zone.rewards.experience} XP</span>
                            </div>
                          </div>

                          <div className="text-sm text-muted-foreground truncate">
                            FACTION: {zone.controllingFaction}
                          </div>
                        </div>
                        {selectedZone?.id === zone.id && (
                          <div className=" top-2 right-2">
                            <Badge variant="default">Selected</Badge>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </>
  );
};
