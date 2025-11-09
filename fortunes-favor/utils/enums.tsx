export function findEnumValue(s: string, e: any): any | undefined {
  if (!s) return;
  const numKeys: string[] = Object.keys(e).filter((key) => !isNaN(Number(key)));
  const strKeys: string[] = Object.keys(e).filter((key) => isNaN(Number(key)));
  // if there are numbers in the key then use them
  const keys = numKeys.length > 0 ? numKeys : strKeys;
  let match = undefined;
  keys.forEach((key) => {
    if (s.toLowerCase() === e[key].toLowerCase()) {
      match = e[key];
    }
  });
  return match;
}
export function findEnumKey(s: string, e: any): string | undefined {
  if (!s) return;
  const entries = Object.entries(e);
  for (const [key, value] of entries) {
    if (value === s) {
      return key;
    }
  }
  return undefined;
}
export enum ActionType {
  ACTION = "ACTION",
  COUNTER = "COUNTER",
}
export enum RuleType {
  RULE = "RULE",
  FLAVOR = "FLAVOR",
  EG = "EG",
  LIST = "LIST",
  COMPACTLIST = "LISTCOMPACT",
  CHOICE = "CHOICE",
  ATTACK = "ATTACK",
  ERROR = "ERROR",
}

export enum ComplexityOptions {
  STD = "standard",
  SIMPLE = "simple",
  COMPLEX = "complex",
  ERROR = "ERROR",
}

export enum StatOptions {
  METTLE = "Mettle",
  AGILITY = "Agility",
  HEART = "Heart",
  INT = "Intellect",
  error = "ERROR",
}

export enum SizeOptions {
  MINISCULE = "MINISCULE",
  TINY = "TINY",
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
  GIGANTIC = "GIGANTIC",
  TITANIC = "TITANIC",
  COLOSSAL = "COLOSSAL",
  ERROR = "ERROR",
}

export enum OptionTypes {
  CLASS = "CLASS",
  LINEAGE = "LINEAGE",
  CULTURE = "CULTURE",
}

export enum Languages {
  ALLSPEAK = "AllSpeak",
  ELVISH = "Elvish",
  DWARVISH = "Dwarvish",
  THISTLETONGUE = "Thistletongue",
  STARREND = "Starrend",
  DEEPROOT = "Deeproot",
  SEAWHISPER = "Seawhisper",
  VOIDHOWL = "Voidhowl",
}

export enum Rarity {
  COMMON = "Common",
  UNCOMMON = "Uncommon",
  RARE = "Rare",
  LEGENDARY = "Legendary",
  UNIQUE = "Unique",
}

export enum RechargeOn {
  NONE = "None",
  CATCH_BREATH = "Catch Your Breath",
  NIGHTS_REST = "Night's Rest",
  REST_AND_RECUPERATE = "Rest & Recuperate",
}
