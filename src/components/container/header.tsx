// components/Header.tsx
import { useState, useEffect } from "react";
import { CommandDialog, CommandInput } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Command, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Home, Package, Trophy, Settings, LogOut } from "lucide-react";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";

interface HeaderProps {
  isLoggedIn?: boolean;
  userData?: {
    name: string;
    gold: number;
    avatarUrl?: string;
  };
}

const menuItems = [
  { label: "Home", icon: <Home className="mr-2 h-4 w-4" />, href: "/" },
  {
    label: "Inventory",
    icon: <Package className="mr-2 h-4 w-4" />,
    href: "/inventory",
  },
  {
    label: "Leaderboard",
    icon: <Trophy className="mr-2 h-4 w-4" />,
    href: "/leaderboard",
  },
  //   {
  //     label: "Settings",
  //     icon: <Settings className="mr-2 h-4 w-4" />,
  //     href: "/settings",
  //   },
];

export function Header({ isLoggedIn, userData }: HeaderProps) {
  const navigate = useNavigate();

  // ... (previous state declarations remain the same)

  const [open, setOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  // Command (cmd+K) handler
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-background border-b">
      {/* Left - Logo */}
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Logo</h1>
      </div>

      {/* Middle - AI Assistant Command */}
      <div className="flex-1 max-w-xl mx-4">
        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground"
          onClick={() => setOpen(true)}>
          <Bot className="mr-2 h-4 w-4" />
          <span>Ask AI Assistant...</span>
          <Command className="ml-auto h-4 w-4" />
        </Button>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Ask anything..." />
          {/* Add your AI assistant dialog content here */}
        </CommandDialog>
      </div>

      {/* Right - User Info & Menu */}
      <div className="flex items-center gap-4">
        {isLoggedIn && userData && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={userData.avatarUrl} />
                <AvatarFallback>{userData.name[0]}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{userData.name}</p>
                <p className="text-xs text-muted-foreground">
                  {userData.gold} Gold
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Sheet with Animated Hamburger */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative w-10 h-10"
              onClick={() => {
                setIsHamburgerOpen(!isHamburgerOpen);
              }}>
              <div className="flex flex-col justify-center items-center w-6 h-6">
                <span
                  className={`bg-current block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${
                      isHamburgerOpen
                        ? "rotate-45 translate-y-1"
                        : "-translate-y-0.5"
                    }`}
                />
                <span
                  className={`bg-current block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm my-0.5 ${
                      isHamburgerOpen ? "opacity-0" : "opacity-100"
                    }`}
                />
                <span
                  className={`bg-current block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${
                      isHamburgerOpen
                        ? "-rotate-45 -translate-y-1"
                        : "translate-y-0.5"
                    }`}
                />
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px] sm:w-[400px]">
            {/* <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader> */}
            <div className="py-4">
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Button
                    key={item.href}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate(item.href);
                      setIsSheetOpen(false);
                    }}>
                    {item.icon}
                    {item.label}
                  </Button>
                ))}
                {/* <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-600"
                  onClick={() => {
                    // Add your logout logic here
                    navigate("/login");
                    setIsSheetOpen(false);
                  }}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button> */}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
