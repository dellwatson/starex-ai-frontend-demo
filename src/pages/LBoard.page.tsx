// pages/leaderboard.tsx
import { PageLayout } from "@/components/layouts/PageLayout";
import { DataTable } from "@/components/ui/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  avatarUrl: string;
  level: number;
}

const mockLeaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    username: "TopPlayer1",
    score: 10000,
    avatarUrl: "https://github.com/shadcn.png",
    level: 50,
  },
  // Add more mock data as needed
];

export default function LeaderboardPage() {
  const columns = [
    {
      key: "rank",
      label: "Rank",
      render: (value: number) => <span className="font-bold">{value}</span>,
    },
    {
      key: "username",
      label: "Player",
      render: (value: string, item: LeaderboardEntry) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={item.avatarUrl} />
            <AvatarFallback>{value[0]}</AvatarFallback>
          </Avatar>
          <span>{value}</span>
        </div>
      ),
    },
    { key: "level", label: "Level" },
    {
      key: "score",
      label: "Score",
      render: (value: number) => (
        <span className="font-mono">{value.toLocaleString()}</span>
      ),
    },
  ];

  return (
    <PageLayout title="Leaderboard" description="Top players rankings">
      <DataTable data={mockLeaderboardData} columns={columns} />
    </PageLayout>
  );
}
