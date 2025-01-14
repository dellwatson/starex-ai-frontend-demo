import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { router } from "./Router";
import { Toaster } from "./components/ui/sonner";
import { GameProviders, initializeGameState } from "./config/game-provider";

export default function App() {
  // Find default ship from mock items or initial inventory
  // initializeGameState();
  return (
    <GameProviders>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </GameProviders>
  );
}
