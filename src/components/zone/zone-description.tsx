// components/zone/zone-description.tsx
import { Button } from "@/components/ui/button";
import { BaseItemDetail } from "../product/base-detail";
import { ZoneBase } from "@/types/items.interface";
import { useMissionStore } from "@/store/mission.store";
import { useZoneStore } from "@/store/zone.store";

interface ZoneDescriptionProps {
  zone: ZoneBase;
  onBack: () => void;
  onClose: () => void;
}

export const ZoneDescription = ({
  zone,
  onBack,
  onClose,
}: ZoneDescriptionProps) => {
  const deployMission = useMissionStore((state) => state.deployMission);
  const setSelectedZone = useZoneStore((state) => state.setSelectedZone);
  const selectedZone = useZoneStore((state) => state.selectedZone);

  const handleSelectZone = () => {
    setSelectedZone(zone);
    onBack();
  };

  const handleDeploy = () => {
    deployMission({
      ...useMissionStore.getState().activeMission,
      selectedZone: zone,
    });
    onClose();
  };

  const renderAttributes = () => {
    return (
      <>
        <div className="space-y-4">
          {/* Controlling Faction */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Control & Support</h4>
            <div className="flex gap-2">
              <div className="flex-1 p-2 rounded-md bg-accent">
                <p className="text-xs text-muted-foreground">Controlling</p>
                <p className="font-medium">{zone.controllingFaction}</p>
              </div>
              <div className="flex-1 p-2 rounded-md bg-accent">
                <p className="text-xs text-muted-foreground">Supporting</p>
                {/* <div className="flex gap-1 flex-wrap">
                  {zone?.supportingFactions.map((faction) => (
                    <span key={faction} className="text-sm">
                      {faction}
                    </span>
                  ))}
                </div> */}
              </div>
            </div>
          </div>

          {/* Possible Findings */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Possible Findings</h4>
            <div className="grid grid-cols-6 gap-2">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded bg-accent flex items-center justify-center">
                    <span className="text-xl">?</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Possible Enemies */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Possible Enemies</h4>
            <div className="grid grid-cols-6 gap-2">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded bg-accent flex items-center justify-center">
                    <span className="text-xl">?</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="space-y-4">
      <Button variant="ghost" onClick={onBack} className="mb-2">
        ← Back to Zones
      </Button>

      <BaseItemDetail item={zone} renderAttributes={renderAttributes} />

      <div className="flex gap-2 mt-4">
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleSelectZone}
          disabled={selectedZone?.id === zone.id}>
          {selectedZone?.id === zone.id ? "Currently Selected" : "Select Zone"}
        </Button>
        <Button disabled className="flex-1" onClick={handleDeploy}>
          Deploy Mission
        </Button>
      </div>
    </div>
  );
};
