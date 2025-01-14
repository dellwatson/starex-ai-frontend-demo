// components/mission/active-missions.tsx
import { useMissionStore } from "@/store/mission.store";
import {
  Card,
  CardFooter,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, StopCircle } from "lucide-react"; // Assuming you're using lucide-react for icons
import { toast } from "sonner";
export function ActiveMissions() {
  const activeMissions = useMissionStore(
    (state) => state.activeMissions?.filter((m) => m.status === "active") || []
  );
  const completeMission = useMissionStore((state) => state.completeMission);

  const handleCompleteMission = (missionId: string) => {
    completeMission(missionId);
    // You might want to add some rewards/inventory logic here
  };

  return (
    <div className="grid gap-4">
      {activeMissions.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No active missions
            </p>
          </CardContent>
        </Card>
      ) : (
        activeMissions.map((mission) => (
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
                <div className="text-sm text-muted-foreground">In Progress</div>
                <div className="text-sm text-muted-foreground">
                  Duration:{" "}
                  {formatDuration(
                    useMissionStore
                      .getState()
                      ?.getMissionDuration(mission.startTime)
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled // Disabled for now as requested
                onClick={() => {
                  /* TODO: Implement details view */
                }}>
                <Eye className="h-4 w-4 mr-2" />
                Details
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  const rewards = completeMission(mission.id);

                  // Create a formatted rewards message
                  const rewardsMessage = rewards
                    ?.map((reward) => `${reward.quantity}x ${reward.name}`)
                    .join(", ");

                  toast.success("Mission Completed!", {
                    description: `Rewards received: ${rewardsMessage}`,
                    duration: 4000,
                  });
                }}>
                <StopCircle className="h-4 w-4 mr-2" />
                Complete Mission
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}
// Add this helper function at the top of the file:
export const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};
