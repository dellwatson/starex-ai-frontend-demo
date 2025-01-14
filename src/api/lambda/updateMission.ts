// src/lambda/updateMission.ts
import { dynamoClient } from "../lib/dynamodb";
import { MissionReward, SpaceshipType } from "../types"; // Import your types

interface CompletedMission {
  id: string;
  leaderId: string;
  ship: SpaceshipType;
  status: "completed";
  startTime: Date;
  endTime: Date;
  duration: number;
  rewards: MissionReward[];
}

export const handler = async (event: any) => {
  try {
    const missionData: CompletedMission = JSON.parse(event.body);

    const params = {
      TableName: "CompletedMissions",
      Item: {
        missionId: missionData.id,
        leaderId: missionData.leaderId,
        shipType: missionData.ship.type,
        startTime: missionData.startTime.getTime(),
        endTime: missionData.endTime.getTime(),
        duration: missionData.duration,
        rewards: missionData.rewards,
        // Add additional fields for leaderboard sorting
        totalRewardValue: missionData.rewards.reduce(
          (sum, reward) => sum + (reward.quantity || 0),
          0
        ),
      },
      // Optional: Add condition to prevent duplicate entries
      ConditionExpression: "attribute_not_exists(missionId)",
    };

    await dynamoClient.put(params).promise();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: true,
        message: "Mission completion recorded",
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to record mission completion" }),
    };
  }
};
