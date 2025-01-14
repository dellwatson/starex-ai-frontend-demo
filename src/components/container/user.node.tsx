import React from "react";
import { MissionList } from "../mission/mission-list";

export default function UserWdiget() {
  return (
    <div>
      {/* list of mission deployed */}

      <div className=" pb-6 overflow-y-scroll">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Missions</h1>
          <p className="text-muted-foreground">
            View and manage your active and previous missions
          </p>
        </div>
        <MissionList />
      </div>
    </div>
  );
}
