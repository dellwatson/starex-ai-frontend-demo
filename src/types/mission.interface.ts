// types/mission.interface.ts
export interface Mission {
  id: string;
  shipId: string;
  zoneId: string;
  startTime: Date;
  endTime?: Date;
  status: "active" | "completed" | "failed";
  consumedResources: {
    food: number;
    fuel: number;
    ammo: number;
  };
  rewards?: {
    experience: number;
    credits: number;
    items?: Array<{
      id: string;
      quantity: number;
    }>;
  };
}

export interface MissionState {
  activeMissions: Mission[];
  previousMissions: Mission[];
  deployMission: (mission: Mission) => void;
  completeMission: (missionId: string, rewards?: Mission["rewards"]) => void;
  failMission: (missionId: string) => void;
}
