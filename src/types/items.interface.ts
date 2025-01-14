// types/items.interface.ts

// Base item interface that all items inherit from
export interface BaseItem {
  id: string;
  name: string;
  type: ItemType;
  category: ItemCategory;
  quantity: number;
  description?: string;
  imageUrl?: string;
}

export enum Rarity {
  COMMON = "common",
  UNCOMMON = "uncommon",
  RARE = "rare",
  EPIC = "epic",
  LEGENDARY = "legendary",
}

// Enum for item types
export enum ItemType {
  SPACESHIP = "spaceship",
  FUEL = "fuel",
  FOOD = "food",
  AMMO = "ammo",
  OUTPOST_PASS = "outpost-pass",
  PLANET_PASS = "planet-pass",
  DUNGEON_KEY = "dungeon-key",
  MATERIAL = "material",
}

// Enum for item categories
export enum ItemCategory {
  SHIP = "SHIP",
  CONSUMABLE = "CONSUMABLE",
  ZONE = "ZONE",
  RESOURCE = "RESOURCE",
}

// Specific interfaces for different item types
export interface SpaceshipItem extends BaseItem {
  type: ItemType.SPACESHIP;
  category: ItemCategory.SHIP;
  health: number;
  maxHealth: number;
  shield: number;
  maxShield: number;
  speed: number;
  capacity: number;
}

// Zone-related interfaces
export interface ZoneBase extends BaseItem {
  category: ItemCategory.ZONE;
  requiredLevel: number;
  maxPlayers: number;
  rewards: ZoneRewards;
  difficulty: ZoneDifficulty;
}

export interface OutpostZone extends ZoneBase {
  type: ItemType.OUTPOST_PASS;
  outpostLevel: number;
  services: OutpostService[];
}

export interface PlanetZone extends ZoneBase {
  type: ItemType.PLANET_PASS;
  planetType: PlanetType;
  resources: PlanetResource[];
}

export interface DungeonZone extends ZoneBase {
  type: ItemType.DUNGEON_KEY;
  bossType: string;
  minLevel: number;
  maxLevel: number;
  stages: number;
}

// Supporting types
export enum ZoneDifficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
  EXTREME = "extreme",
}

// will be repeated -> back to Items
export interface ZoneRewards {
  experience: number;
  credits: number;
  items?: {
    itemId: string;
    dropRate: number;
  }[];
}

export enum OutpostService {
  REPAIR = "repair",
  TRADE = "trade",
  MISSION = "mission",
  UPGRADE = "upgrade",
}

export enum PlanetType {
  TERRESTRIAL = "terrestrial",
  GAS_GIANT = "gas-giant",
  ICE = "ice",
  DESERT = "desert",
}

export interface PlanetResource {
  type: string;
  abundance: number;
}

// Consumable items
export interface ConsumableItem extends BaseItem {
  category: ItemCategory.CONSUMABLE;
  effect: number;
  duration?: number;
}

export interface FuelItem extends ConsumableItem {
  type: ItemType.FUEL;
  efficiency: number;
}

export interface FoodItem extends ConsumableItem {
  type: ItemType.FOOD;
  nutritionValue: number;
}

export interface AmmoItem extends ConsumableItem {
  type: ItemType.AMMO;
  damage: number;
}

// Type guards
export const isSpaceship = (item: BaseItem): item is SpaceshipItem => {
  return item.type === ItemType.SPACESHIP;
};

export const isZone = (item: BaseItem): item is ZoneBase => {
  return item.category === ItemCategory.ZONE;
};

export const isConsumable = (item: BaseItem): item is ConsumableItem => {
  return item.category === ItemCategory.CONSUMABLE;
};

// Updated PlayMatch interfaces
export interface ActiveMission {
  ship: SpaceshipItem | null;
  consumedFood: number;
  consumedAmmo: number;
  consumedFuel: number;
  selectedZone: ZoneBase | null;
}

export interface MissionDeployParams {
  ship: SpaceshipItem;
  foodAmount: number;
  ammoAmount: number;
  fuelAmount: number;
  zone: ZoneBase;
}
