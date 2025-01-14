// components/ZoneEvents.tsx
import { setupEventGenerator, useZoneStore } from "@/store/zone.store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  Gem,
  Swords,
  Telescope,
  Clock,
  Users,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useEffect } from "react";
import { useMissionStore } from "@/store/mission.store";

const eventTypeIcons = {
  DANGER: <AlertCircle className="h-4 w-4" />,
  RESOURCE: <Gem className="h-4 w-4" />,
  BATTLE: <Swords className="h-4 w-4" />,
  DISCOVERY: <Telescope className="h-4 w-4" />,
};

const severityColors = {
  low: "bg-yellow-500/10 text-yellow-500",
  medium: "bg-orange-500/10 text-orange-500",
  high: "bg-red-500/10 text-red-500",
};

export function ZoneEvents() {
  const { selectedZone, zonesData } = useZoneStore();
  const activeMissions = useMissionStore(
    (state) => state.activeMissions?.filter((m) => m.status === "active") || []
  );
  // Add the event generator effect
  useEffect(() => {
    if (selectedZone) {
      const cleanup = setupEventGenerator(selectedZone.id);
      return () => cleanup();
    }
  }, [selectedZone]);

  if (!selectedZone) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No zone selected
      </div>
    );
  }

  const zoneData = zonesData[selectedZone.id];
  const events = zoneData?.events || [];
  const fleetCount = zoneData?.fleetCount || 0;

  //   // // Usage in your component:
  //   useEffect(() => {
  //     if (selectedZone) {
  //       const cleanup = setupEventGenerator(selectedZone.id);
  //       return () => cleanup();
  //     }
  //   }, [selectedZone]);

  return (
    <Card className="p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{selectedZone.name} Events</h2>
        <p className="text-sm text-muted-foreground">
          Zone #{selectedZone.id.slice(0, 8)}
        </p>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="text-sm">
            {fleetCount + activeMissions?.length} Fleets
          </span>
        </div>
      </div>

      <ScrollArea className="h-[400px] pr-4 ">
        <div className="space-y-4 pb-20">
          {events.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No active events
            </div>
          ) : (
            events
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((event) => (
                <Card
                  key={event.id}
                  className="p-4 border border-border/50 hover:border-border transition-colors">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-lg ${
                        severityColors[event.severity || "low"]
                      }`}>
                      {eventTypeIcons[event.type]}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{event.type}</div>
                        <Badge
                          variant="outline"
                          className={severityColors[event.severity || "low"]}>
                          {event.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(event.timestamp, {
                          addSuffix: true,
                        })}
                      </div>
                      {event.rewards && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {event.rewards.map((reward, index) => (
                            <Badge key={index} variant="secondary">
                              {reward.quantity}x {reward.type}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}
