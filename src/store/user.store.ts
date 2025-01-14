// src/stores/user.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStats {
  gold: number;
  stars: number;
  completedMissions: string[];
}

interface UserState {
  userId: string | null;
  username: string | null;
  factionId: string | null;
  stats: UserStats;
  isAuthenticated: boolean;
  setUserId: (id: string) => void;
  setUserFaction: (factionId: string) => void;
  updateStats: (stats: Partial<UserStats>) => void;
  completeMission: (
    missionId: string,
    rewards: { gold?: number; stars?: number }
  ) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: null,
      username: null,
      factionId: null,
      stats: {
        gold: 0,
        stars: 0,
        completedMissions: [],
        // XP, Level, etc soon
      },
      isAuthenticated: false,

      setUserId: (id) => set({ userId: id, isAuthenticated: true }),
      setUserFaction: (factionId) => set({ factionId }),
      updateStats: (newStats) =>
        set((state) => ({
          stats: { ...state.stats, ...newStats },
        })),
      completeMission: (missionId, rewards) =>
        set((state) => ({
          stats: {
            ...state.stats,
            gold: state.stats.gold + (rewards.gold || 0),
            stars: state.stats.stars + (rewards.stars || 0),
            completedMissions: [...state.stats.completedMissions, missionId],
          },
        })),
      logout: () =>
        set({
          userId: null,
          username: null,
          factionId: null,
          stats: { gold: 0, stars: 0, completedMissions: [] },
          isAuthenticated: false,
        }),
    }),
    {
      name: "user-storage",
    }
  )
);
