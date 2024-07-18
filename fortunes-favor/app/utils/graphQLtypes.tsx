import {
  action_type,
  complexity_options,
  rule_type,
  size_options,
  stat_options,
} from "../enums";

export type SearchResult = {
  title: string;
  slug: string;
  text: RuleText[];
};

export type RuleText = {
  text: string;
  type?: string;
  options?: string[];
};

export type GenericRule = {
  title: string;
  slug: string;
  ruleType: rule_type;
  text: RuleText[];
  rules: GenericRule[];
  list: string[];
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
  size: size_options[];
  speed: number;
  stat: string;
  traits: GenericRule[];
};

export type GenericFeature = {
  title: string;
  slug: string;
  ruleType: rule_type;
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
  stat: stat_options;
};

export type FeatureChoices = RuleText | FeatureWithoutChoices;

export type FeatureWithoutChoices = {
  title: string;
  slug: string;
  href?: string;
  shortTitle?: string;
  staminaCost: number;
  costsFortunesFavor: boolean;
  ruleType: rule_type;
  actionType?: action_type;
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
  ruleType: rule_type;
  actionType?: action_type;
  text: RuleText[];
  multiSelect: boolean;
  shortText?: string;
  choices: FeatureChoices[];
};

export type CharacterClass = {
  title: string;
  slug: string;
  complexity?: complexity_options;
  description: string[];
  health: number;
  healthOnLevel: number;
  stamina: number;
  staminaOnLevel: number;
  staminaStat: stat_options;
  training: Training;
  attackStat: stat_options[];
  range: Range;
  damage: Damage;
  features: CharacterClassFeature[];
};
