import { Button } from "@radix-ui/themes";
import React from "react";

export default function GraphZone() {
  return (
    <div>
      {/* has button to open modal for zones */}
      <Button>Zones</Button>
      3d container --
      <br />
      <br />
      <br />
      <br />
      <br />
      THis will show the 3D graph zone, and the current situation.
      <Button>Play</Button>
      {/* has button play -> and will open modal of the used to be resources or consumption:
      //  after user approve this, the mission is deploy, and show it on the list of users section
      */}
    </div>
  );
}
