// src/lambda/getUserStats.ts
import { DynamoDB } from "aws-sdk";

const dynamodb = new DynamoDB.DocumentClient();

interface UserFaction {
  userId: string;
  factionId: string;
  timestamp: number;
}

export const handler = async (event: any) => {
  try {
    const params = {
      TableName: "UserFactions",
    };

    const result = await dynamodb.scan(params).promise();
    const items = result.Items as UserFaction[];

    // Calculate faction distribution
    const factionStats = items.reduce(
      (acc: { [key: string]: number }, item) => {
        acc[item.factionId] = (acc[item.factionId] || 0) + 1;
        return acc;
      },
      {}
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        totalUsers: items.length,
        factionStats,
        lastUpdated: new Date().toISOString(),
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch user statistics" }),
    };
  }
};
