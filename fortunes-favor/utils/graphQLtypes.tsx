import { ActionType, ComplexityOptions, RuleType, StatOptions } from "./enums";
import featureChoice from "./types/featureChoice";

export type SearchResult = {
  title: string;
  slug: string;
  text: RuleText[];
};

export type RuleText = {
  text: string;
  type?: string;
};

export type Img = {
  target: string;
  style?: string;
};

export type BaseStats = {
  mettle: number;
  agility: number;
  heart: number;
  intellect: number;
};

export type GenericRule = {
  title: string;
  slug: string;
  ruleType: RuleType;
  text: RuleText[];
  subRules: GenericRule[];
  lists: { label?: string; items: string[] }[];
  shortText?: string;
  img?: Img;
};

export type graphQLCulture = {
  title: string;
  slug: string;
  description: string[];
  img?: Img;
  stat: string;
  languages: string;
  traits: GenericRule[];
};

export type GenericFeature = {
  title: string;
  slug: string;
  ruleType: RuleType;
  text: RuleText[];
  shortText?: string;
  multiSelect: boolean;
  choices: featureChoice[];
  isVariant: boolean;
};

export type SlugDict = {
  slug: string;
  url: string;
};

export type Options = {
  pick?: number;
  options: string[];
};

export type Weapons = {
  melee: Options;
  ranged: Options;
  special: Options;
};

export type Training = {
  armor: string[];
  shields: string[];
  weapons: Weapons;
  magic: Options;
};

export type Range = {
  min: number;
  max: number;
};

export type Damage = {
  dice?: number;
  count?: number;
  stat?: StatOptions[];
  type?: [string];
  flat?: number;
};

export type Deflect = {
  dice: number;
  count: number;
  flat: number;
};

export type FeatureWithoutChoices = {
  title: string;
  slug: string;
  href?: string;
  shortTitle?: string;
  staminaCost: number;
  costsFortunesFavor: boolean;
  ruleType: RuleType;
  actionType?: ActionType;
  text: RuleText[];
  multiSelect: boolean;
  shortText?: string;
};

export type CharacterClassFeature = {
  title: string;
  slug: string;
  href?: string;
  shortTitle?: string;
  level: number;
  staminaCost: number;
  costsFortunesFavor: boolean;
  ruleType: RuleType;
  actionType?: ActionType;
  text: RuleText[];
  multiSelect: boolean;
  shortText?: string;
  choices: featureChoice[];
  isVariant: boolean;
};

export type CharacterClass = {
  title: string;
  slug: string;
  complexity?: ComplexityOptions;
  description: string[];
  img?: Img;
  health: number;
  healthOnLevel: number;
  stamina: number;
  staminaOnLevel: number;
  staminaStat: StatOptions;
  training: Training;
  attackStat: StatOptions[];
  range: Range;
  damage: Damage;
  deflect: Deflect;
  features: CharacterClassFeature[];
};
