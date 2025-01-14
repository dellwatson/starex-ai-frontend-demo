// components/mission/mission-list.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActiveMissions } from "./active-missions";
import { PrevMissions } from "./prev-missions";

export function MissionList() {
  return (
    <Tabs defaultValue="active" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="active">Active Missions</TabsTrigger>
        <TabsTrigger value="previous">Previous Missions</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <ActiveMissions />
      </TabsContent>
      <TabsContent value="previous">
        <PrevMissions />
      </TabsContent>
    </Tabs>
  );
}

// // pages/missions/all.tsx
// export default function MissionsPage() {
//     return (
//       <div className="container py-6">
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold">Missions</h1>
//           <p className="text-muted-foreground">
//             View and manage your active and previous missions
//           </p>
//         </div>
//         <MissionList />
//       </div>
//     );
//   }
