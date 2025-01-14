// components/mission/prev-missions.tsx
import { useMissionStore } from "@/store/mission.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDuration } from "date-fns";

export function PrevMissions() {
  const missions = useMissionStore((state) =>
    state.previousMissions.filter((m) => m.status === "completed")
  );

  return (
    <div className="grid gap-4">
      {missions.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No previous missions
            </p>
          </CardContent>
        </Card>
      ) : (
        missions.map((mission) => (
          <Card key={mission.id}>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>{mission.ship.name}</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(mission.startTime).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>Zone: {mission.zone.name}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
                <div className="text-sm text-muted-foreground">
                  Duration: {formatDuration(mission.duration)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
