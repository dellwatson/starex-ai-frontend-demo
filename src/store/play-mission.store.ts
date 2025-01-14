// // stores/playmatch.store.ts
// import create from "zustand";
// import { devtools } from "zustand/middleware";
// import {
//   ActiveMission,
//   MissionDeployParams,
//   SpaceshipItem,
// } from "../types/items.interface";

// interface PlayMatchState {
//   activeMission: ActiveMission;
//   deployMission: (params: MissionDeployParams) => void;
//   completeMission: () => SpaceshipItem | null;
//   resetMission: () => void;
// }

// const usePlayMatchStore = create<PlayMatchState>()(
//   devtools(
//     (set, get) => ({
//       activeMission: {
//         ship: null,
//         consumedFood: 0,
//         consumedAmmo: 0,
//         consumedFuel: 0,
//         selectedZone: null,
//       },

//       deployMission: ({ ship, foodAmount, ammoAmount, fuelAmount, zone }) => {
//         set((state) => ({
//           activeMission: {
//             ship,
//             consumedFood: foodAmount,
//             consumedAmmo: ammoAmount,
//             consumedFuel: fuelAmount,
//             selectedZone: zone,
//           },
//         }));
//       },

//       completeMission: () => {
//         const { ship } = get().activeMission;
//         set((state) => ({
//           activeMission: {
//             ship: null,
//             consumedFood: 0,
//             consumedAmmo: 0,
//             consumedFuel: 0,
//             selectedZone: null,
//           },
//         }));
//         return ship;
//       },

//       resetMission: () => {
//         set((state) => ({
//           activeMission: {
//             ship: null,
//             consumedFood: 0,
//             consumedAmmo: 0,
//             consumedFuel: 0,
//             selectedZone: null,
//           },
//         }));
//       },
//     }),
//     {
//       name: "playmatch-store",
//     }
//   )
// );

// export default usePlayMatchStore;
