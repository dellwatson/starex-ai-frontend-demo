// stores/mission.store.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Mission, MissionState } from "@/types/mission.interface";
import { useInventoryStore } from "./inventory-store";
import { ItemType } from "@/types/items.interface";
import { mockRewards } from "@/components/_mocks/mockRewards";

const isDevelopment = true;
const generateMissionRewards = (durationInMinutes: number) => {
  // Development mode override
  if (isDevelopment) {
    // Always return 2-4 rewards with generous quantities for testing
    const numRewards = Math.floor(Math.random() * 3) + 2; // 2-4 different rewards
    return Array.from({ length: numRewards }, () => ({
      ...mockRewards[Math.floor(Math.random() * mockRewards.length)],
      quantity: Math.floor(Math.random() * 50) + 20, // Always generous quantity (20-70) in dev mode
    }));
  }

  // Production mode
  const numRewards = Math.floor(Math.random() * 3) + 2; // 2-4 different rewards
  const selectedRewards = [];

  // Ensure durationInMinutes is valid
  const validDuration = Math.max(0, durationInMinutes || 0);

  for (let i = 0; i < numRewards; i++) {
    const reward = {
      ...mockRewards[Math.floor(Math.random() * mockRewards.length)],
      quantity: Math.floor(Math.random() * validDuration + 10), // More duration = more quantity
    };
    selectedRewards.push(reward);
  }

  return selectedRewards;
};

export const useMissionStore = create<MissionState>()(
  devtools(
    (set, get) => ({
      activeMissions: [],
      previousMissions: [],

      deployMission: (mission) =>
        set((state) => ({
          activeMissions: [...state.activeMissions, mission],
        })),

      getMissionDuration: (startTime: Date) => {
        const now = new Date();
        const diffInMinutes = Math.floor(
          (now.getTime() - startTime.getTime()) / (1000 * 60)
        );
        return diffInMinutes;
      },

      completeMission: (missionId: string) => {
        const mission = get().activeMissions.find((m) => m.id === missionId);
        if (!mission) return;

        const duration = get().getMissionDuration(mission.startTime);
        const rewards = generateMissionRewards(duration);

        const inventory = useInventoryStore.getState();

        // Return spaceship
        inventory.addToInventory({
          type: ItemType.SPACESHIP,
          quantity: 1,
          ...mission.ship,
        });

        // Add rewards to inventory
        rewards.forEach((reward) => {
          inventory.addToInventory(reward);
        });
        console.log(rewards, "rewards");

        const completeMission = {
          ...mission,
          status: "completed" as const,
          endTime: new Date(),
          duration,
          rewards, // Store rewards in mission history
        };

        set((state) => ({
          activeMissions: state.activeMissions.filter(
            (m) => m.id !== missionId
          ),
          previousMissions: [completeMission, ...state.previousMissions],
          //   activeMissions: state.activeMissions.map((m) =>
          //     m.id === missionId
          //       ? {
          //           ...m,
          //           status: "completed",
          //           endTime: new Date(),
          //           duration,
          //           rewards, // Store rewards in mission history
          //         }
          //       : m
          //   ),
        }));
        return rewards;
      },

      failMission: (missionId) =>
        set((state) => {
          const mission = state.activeMissions.find((m) => m.id === missionId);
          if (!mission) return state;

          const failedMission = {
            ...mission,
            status: "failed" as const,
            endTime: new Date(),
          };

          return {
            activeMissions: state.activeMissions.filter(
              (m) => m.id !== missionId
            ),
            previousMissions: [failedMission, ...state.previousMissions],
          };
        }),
    }),
    {
      name: "mission-store",
    }
  )
);
