// components/ZoneSelector.tsx
import usePlayMatchStore from "../stores/playmatch.store";
import useInventoryStore from "../stores/inventory.store"; // Assuming you have this

const ZoneSelector = () => {
  const inventory = useInventoryStore((state) => state.inventory);

  // Filter zones by category
  const zones = inventory.filter((item) => item.category === "ZONE");

  const outpostZones = zones.filter((zone) => zone.type === "outpost");
  const planetZones = zones.filter((zone) => zone.type === "planet");
  const dungeonZones = zones.filter((zone) => zone.type === "dungeon");

  // ... rest of the component code
};

// components/DeployMission.tsx
const DeployMission = () => {
  const deployMission = usePlayMatchStore((state) => state.deployMission);
  const inventory = useInventoryStore((state) => state.inventory);
  const removeFromInventory = useInventoryStore((state) => state.removeItems);

  const handleDeploy = () => {
    // Example deployment
    const ship = inventory.find((item) => item.type === "spaceship");
    const zone = inventory.find((item) => item.type === "outpost"); // Or selected zone

    if (!ship || !zone) return;

    // Remove items from inventory
    removeFromInventory([
      { type: "spaceship", quantity: 1 },
      { type: "food", quantity: 10 },
      { type: "ammo", quantity: 5 },
      { type: "fuel", quantity: 3 },
    ]);

    // Deploy mission
    deployMission({
      ship,
      foodAmount: 10,
      ammoAmount: 5,
      fuelAmount: 3,
      zone,
    });
  };

  return <button onClick={handleDeploy}>Deploy Mission</button>;
};

// components/MissionComplete.tsx
const MissionComplete = () => {
  const completeMission = usePlayMatchStore((state) => state.completeMission);
  const addToInventory = useInventoryStore((state) => state.addItems);

  const handleMissionComplete = () => {
    const returnedShip = completeMission();
    if (returnedShip) {
      addToInventory([returnedShip]);
    }
  };

  return <button onClick={handleMissionComplete}>Complete Mission</button>;
};
