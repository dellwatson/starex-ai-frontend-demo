interface FactionResponse {
  success: boolean;
  error?: string;
}

interface SaveFactionParams {
  playerId: string;
  factionId: number;
}

// Mock API response with artificial delay
const mockSaveFaction = async (
  params: SaveFactionParams
): Promise<FactionResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network delay
  return {
    success: true,
  };
};

// Real API call
const realSaveFaction = async (
  params: SaveFactionParams
): Promise<FactionResponse> => {
  const response = await fetch("your-api-endpoint/save-faction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();
  return {
    success: response.ok,
    error: !response.ok ? data.error : undefined,
  };
};

export function useFactionAPI() {
  const saveFaction = async (
    params: SaveFactionParams
  ): Promise<FactionResponse> => {
    try {
      // Use mock API in development, real API in production
      if (true) {
        // if (process.env.NODE_ENV === "development") {
        return await mockSaveFaction(params);
      }
      return await realSaveFaction(params);
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  };

  return { saveFaction };
}
