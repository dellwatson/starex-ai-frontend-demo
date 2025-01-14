// pages/Home-page.tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/container/header";
import GraphZone from "@/components/container/graph-zone.node";
import SystemWidget from "@/components/container/system.node";
import UserWdiget from "@/components/container/user.node";
import { ZoneWidget } from "@/components/container/multiplayer.node";
import DialogFactions from "@/components/dialog/dialog-factions";

// Mock user data
const userData = {
  name: "John Doe",
  gold: 1000,
  avatarUrl: "https://github.com/shadcn.png", // example avatar
};

export default function Homepage() {
  return (
    <div className="h-screen w-full flex flex-col">
      <DialogFactions />
      {/* Header */}
      <div className="">
        <Header isLoggedIn={true} userData={userData} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="vertical">
          {/* Main Content Area */}
          <ResizablePanel defaultSize={75}>
            <div className="h-full">
              {/* Desktop View */}
              <div className="hidden md:block h-full">
                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel defaultSize={25}>
                    <div className="h-full bg-sage-600  p-4">
                      <SystemWidget />
                    </div>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={50}>
                    <div className="h-full bg-olive-500 p-4">
                      <GraphZone />
                    </div>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={25}>
                    <div className="h-full bg-sage-600  p-4">
                      <UserWdiget />
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>

              {/* Mobile View */}
              {/* Mobile View */}
              <div className="md:hidden h-full">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="left-panel">
                    <AccordionTrigger className="bg-sage-600 px-4">
                      System Section
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="bg-gray-100 p-4 data-[state=open]:h-[calc(100dvh-8rem)] overflow-auto">
                        <SystemWidget />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="middle-panel">
                    <AccordionTrigger className="bg-green-500 px-4">
                      Graph Zone
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="bg-green-500 p-4 data-[state=open]:h-[calc(100dvh-8rem)] overflow-auto">
                        <GraphZone />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="right-panel">
                    <AccordionTrigger className="bg-sage-600  px-4">
                      User Section
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="bg-sage-600  p-4 data-[state=open]:h-[calc(100dvh-8rem)] overflow-auto">
                        <UserWdiget />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </ResizablePanel>

          {/* Footer */}
          <ResizableHandle withHandle className="hidden md:flex" />
          <ResizablePanel defaultSize={25} className="hidden md:block">
            <ZoneWidget />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

// craft logic calculations, miss rate etc
// sending ship for mission,

// can show how much ship on mission durable, % of losing, and destroyed, the % hardship
