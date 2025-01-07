import { Icons } from "@/components/icons";

interface NavItem {
  title: string;
  to?: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
}

interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export const mainMenu: NavItemWithChildren[] = [
  {
    title: "Home",
    to: "",
  },
  {
    title: "About",
    to: "",
  },
  {
    title: "Trade",
    items: [
      {
        title: "Trading",
        to: "/",
      },
      {
        title: "Swap",
        to: "/",
      },
      {
        title: "Marketplace",
        to: "/#",
      },
    ],
  },
  {
    title: "Create",
    items: [
      {
        title: "Project (Pod)",
        to: "/sample",
      },
      {
        title: "Product (Pea)",
        to: "/#",
      },
    ],
  },
  // {
  //   title: "Dashboard", // user
  //   to: "/dashboard",
  // },
];

export const sideMenu: NavItemWithChildren[] = [];