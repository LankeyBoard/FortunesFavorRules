import {
  ActionType,
  ComplexityOptions,
  RuleType,
  SizeOptions,
  StatOptions,
} from "./enums";

export type SearchResult = {
  title: string;
  slug: string;
  text: RuleText[];
};

export type RuleText = {
  text: string;
  type?: string;
  choices?: string[];
};

export type GenericRule = {
  title: string;
  slug: string;
  ruleType: RuleType;
  text: RuleText[];
  subRules: GenericRule[];
  lists: { label?: string; items: string[] }[];
  shortText?: string;
};

export type graphQLCulture = {
  title: string;
  slug: string;
  description: string[];
  stat: string;
  languages: string;
  traits: GenericRule[];
};

export type graphQLLineage = {
  title: string;
  slug: string;
  description: string[];
  size: SizeOptions[];
  speed: number;
  stat: string;
  traits: GenericRule[];
};

export type GenericFeature = {
  title: string;
  slug: string;
  ruleType: RuleType;
  text: RuleText[];
  shortText?: string;
  multiSelect: boolean;
  choices: FeatureChoices[];
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
  dice: number;
  count: number;
  stat: StatOptions[];
};

export type Deflect = {
  dice: number;
  count: number;
  flat: number;
};

export type FeatureChoices = RuleText | FeatureWithoutChoices;

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
  choices: FeatureChoices[];
};

export type CharacterClass = {
  title: string;
  slug: string;
  complexity?: ComplexityOptions;
  description: string[];
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
