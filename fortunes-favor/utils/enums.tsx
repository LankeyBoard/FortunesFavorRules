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
export enum action_type {
  action = "ACTION",
  counter = "COUNTER",
}
export enum rule_type {
  Rule = "RULE",
  Flavor = "FLAVOR",
  Eg = "EG",
  List = "LIST",
  CompactList = "LISTCOMPACT",
  Choice = "CHOICE",
  Attack = "ATTACK",
  error = "ERROR",
}

export enum complexity_options {
  std = "standard",
  simple = "simple",
  complex = "complex",
  error = "ERROR",
}

export enum stat_options {
  mettle = "Mettle",
  agility = "Agility",
  heart = "Heart",
  int = "Intellect",
  error = "ERROR",
}

export enum size_options {
  Miniscule = "MINISCULE",
  Tiny = "TINY",
  Small = "SMALL",
  Medium = "MEDIUM",
  Large = "LARGE",
  Gigantic = "GIGANTIC",
  Titanic = "TITANIC",
  Colossal = "COLOSSAL",
  error = "ERROR",
}

export enum option_type {
  class = "CLASS",
  lineage = "LINEAGE",
  culture = "CULTURE",
}

export enum LANGUAGES {
  allspeak = "AllSpeak",
  elvish = "Elvish",
  dwarvish = "Dwarvish",
  thistletongue = "Thistletongue",
  starrend = "Starrend",
  deeproot = "Deeproot",
  seawhisper = "Seawhisper",
  voidhowl = "Voidhowl",
}
