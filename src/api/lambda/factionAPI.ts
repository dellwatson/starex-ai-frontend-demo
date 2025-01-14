// src/api/factionAPI.ts
interface SaveFactionParams {
  playerId: string;
  factionId: number;
}

interface SaveFactionResponse {
  success: boolean;
  error?: string;
}

export const useFactionAPI = () => {
  const saveFaction = async ({
    playerId,
    factionId,
  }: SaveFactionParams): Promise<SaveFactionResponse> => {
    try {
      const response = await fetch("YOUR_LAMBDA_API_ENDPOINT/faction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: playerId, // Note: using userId to match DynamoDB schema
          factionId: factionId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.error || "Failed to save faction",
        };
      }

      const data = await response.json();

      // Also update the user store
      useUserStore.getState().setUserFaction(factionId.toString());

      return {
        success: true,
      };
    } catch (error) {
      console.error("Error saving faction:", error);
      return {
        success: false,
        error: "An unexpected error occurred while saving faction",
      };
    }
  };

  return { saveFaction };
};
