import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import WrapperDialog from "./index";
import { v4 as uuidv4 } from "uuid";
import { useFactionAPI } from "@/hooks/use-faction";
import useSound from "use-sound"; // Import use-sound
import { TypingChat } from "../ai/type-chat";
import { VoiceChat } from "../ai/voice-chat";

const FACTIONS = [
  {
    // id: 1,
    name: "STARKNET",
    description:
      "A decentralized Validity-Rollup solution for Ethereum, enabling scalable and secure dApps with STARK proofs.",
  },
  {
    // id: 2,
    name: "TRON",
    description:
      "A blockchain-based decentralized platform aiming to build a free, global digital content entertainment system.",
  },
  {
    // id: 3,
    name: "POLKADOT",
    description:
      "A multi-chain network that enables interoperability between blockchains, allowing them to share data and functionality.",
  },
  {
    // id: 4,
    name: "POLYGON",
    description:
      "A Layer 2 scaling solution for Ethereum, providing faster and cheaper transactions while maintaining security.",
  },
  {
    // id: 5,
    name: "SOLANA",
    description:
      "A high-performance blockchain designed for decentralized apps and crypto-currencies, known for its speed and low fees.",
  },
  {
    // id: 6,
    name: "BNB",
    description:
      "The native cryptocurrency of the Binance ecosystem, powering transactions and operations on the Binance Smart Chain.",
  },
  // ... other factions
];

function DialogFactions() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedFaction, setSelectedFaction] = useState<number | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use sound hook instead of Audio API
  const [playClose] = useSound("/sounds/laser.mp3", {
    volume: 0.5,
  });
  const [playSelect] = useSound("/sounds/laser.mp3", { volume: 0.7 });
  const [playHover] = useSound("/sounds/laser.mp3", { volume: 0.2 });

  const { saveFaction } = useFactionAPI();

  useEffect(() => {
    const storedData = localStorage.getItem("playerFaction");
    if (storedData) {
      const { id, faction } = JSON.parse(storedData);
      setPlayerId(id);
      setSelectedFaction(faction);
      setIsOpen(false);
    } else {
      setPlayerId(uuidv4());
    }
  }, []);

  const handleFactionSelect = async (factionId: number) => {
    if (!playerId) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await saveFaction({
        playerId,
        factionId,
      });

      if (result.success) {
        // localStorage.setItem(
        //   "playerFaction",
        //   JSON.stringify({
        //     id: playerId,
        //     faction: factionId,
        //   })
        // );

        setSelectedFaction(factionId);
        playClose(); // Play sound using the hook
        // setIsOpen(false);
        // Delay closing to allow for fade animation
        setTimeout(() => {
          setIsOpen(false);
        }, 300); // Match this with your CSS transition duration
      } else {
        setError(result.error || "Failed to save faction choice");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WrapperDialog
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (selectedFaction) {
          setIsOpen(open);
        }
      }}
      title="Choose Your Faction"
      description="Select the main faction to begin your journey."
    >
      {/* <TypingChat /> */}
      {/* <VoiceChat /> */}

      {/* Rest of the component remains the same, reveals after the voice done */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {FACTIONS.map((faction) => (
          <button
            key={faction.id}
            onMouseEnter={() => playHover()}
            //   onClick={() => {
            //     playSelect();
            onClick={() => {
              playSelect();
              handleFactionSelect(faction.id);
            }}
            className={`
              p-4 border-2 rounded-lg transition-all duration-200
              ${
                selectedFaction === faction.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }
              flex flex-col items-center text-center min-h-[150px]
              ${!selectedFaction ? "hover:scale-105" : ""}
            `}
            disabled={selectedFaction !== null}
          >
            <h3 className="text-lg font-bold mb-2">{faction.name}</h3>
            <p className="text-sm text-gray-600">{faction.description}</p>
          </button>
        ))}
      </div>

      {selectedFaction && (
        <div className="mt-4 text-center text-green-600">
          Faction selected! You may now close this dialog.
        </div>
      )}
    </WrapperDialog>
  );
}

export default DialogFactions;

// const [playClose] = useSound('/sounds/close.mp3', { volume: 0.5 });
// const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.2 });
// const [playSelect] = useSound('/sounds/select.mp3', { volume: 0.7 });

// // Use in your component:
// <button
//   onMouseEnter={() => playHover()}
//   onClick={() => {
//     playSelect();
//     handleFactionSelect(faction.id);
//   }}
// >
//   {/* Button content */}
// </button>
