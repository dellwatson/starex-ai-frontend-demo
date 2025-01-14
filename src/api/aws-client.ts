// frontend/src/api/client.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const awsAPI = {
  faction: {
    update: async (playerId: string, factionId: number) => {
      const response = await fetch(`${API_BASE_URL}/faction/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId, factionId }),
      });
      return response.json();
    },
  },

  mission: {
    complete: async (missionData: any) => {
      const response = await fetch(`${API_BASE_URL}/mission/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(missionData),
      });
      return response.json();
    },
  },
};
