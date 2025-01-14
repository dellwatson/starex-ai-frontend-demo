import { createBrowserRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./pages/NoMatch";
import Homepage from "./pages/Home-page";
import LeaderboardPage from "./pages/LBoard.page";
import InventoryPage from "./pages/Inventory-page";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Applayout />,
      children: [
        {
          path: "",
          element: <Homepage />,
        },

        {
          path: "/leaderboard",
          element: <LeaderboardPage />,
        },
        {
          path: "/inventory",
          element: <InventoryPage />,
        },

        // {
        //   path: "profile",
        //   element: <Profile />,
        // },
      ],
    },
    // {
    //   path: "/Dashboard",
    //   element: <Dashboard />,
    //   children: [
    //     {
    //       path: "my-product",
    //       element: <MyProduct />,
    //     },
    //   ],
    // },
    {
      path: "*",
      element: <div />,
    },
  ]
  // {
  //   basename: global.basename,
  // }
);
