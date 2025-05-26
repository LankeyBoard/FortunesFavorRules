export function findEnum(s: string, e: any): any | undefined {
  if (!s) return;
  let keys: string[] = Object.keys(e);
  let match = undefined;
  keys.forEach((key) => {
    if (s.toLocaleLowerCase() === e[key].toLocaleLowerCase()) {
      match = e[key];
    }
  });
  return match;
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
  COMMON,
  UNCOMMON,
  RARE,
  LEGENDARY,
  UNIQUE,
}

export enum RechargeOn {
  NONE,
  CATCH_BREATH,
  NIGHTS_REST,
  REST_AND_RECUPERATE,
}
