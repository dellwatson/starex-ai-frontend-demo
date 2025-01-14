// src/hooks/useLeaderboard.ts
import { useState, useEffect } from "react";

interface LeaderboardEntry {
  userId: string;
  username: string;
  stars: number;
  gold: number;
  completedMissions: number;
}

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await fetch("YOUR_LAMBDA_API_ENDPOINT/leaderboard");
      if (!response.ok) throw new Error("Failed to fetch leaderboard");

      const data = await response.json();
      setLeaderboard(data.leaderboard);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return { leaderboard, loading, error, refreshLeaderboard: fetchLeaderboard };
};
