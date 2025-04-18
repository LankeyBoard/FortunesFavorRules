import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Action = "ACTION" | "COUNTER";

export type AuthPayload = {
  __typename?: "AuthPayload";
  token?: Maybe<Scalars["String"]["output"]>;
  user?: Maybe<User>;
};

export type BeastAbility = {
  __typename?: "BeastAbility";
  text: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  type: Scalars["String"]["output"];
};

export type BeastForm = {
  __typename?: "BeastForm";
  abilities: Array<BeastAbility>;
  damage: Damage;
  health: BeastHealth;
  size: Size;
  slug: Scalars["String"]["output"];
  speed: Array<Speed>;
  stats: BeastStats;
  title: Scalars["String"]["output"];
};

export type BeastHealth = {
  __typename?: "BeastHealth";
  base: Scalars["Int"]["output"];
  perLevel: Scalars["Int"]["output"];
};

export type BeastStats = {
  __typename?: "BeastStats";
  agility: Scalars["Int"]["output"];
  heart: Scalars["Int"]["output"];
  intellect: Scalars["Int"]["output"];
  mettle: Scalars["Int"]["output"];
};

export type BeastmasterPet = {
  __typename?: "BeastmasterPet";
  beasts: Array<BeastForm>;
  description: Array<Maybe<Scalars["String"]["output"]>>;
  slug: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export type Character = {
  __typename?: "Character";
  agility: Scalars["Int"]["output"];
  armorName: Scalars["String"]["output"];
  baseDamage: Scalars["Int"]["output"];
  characterClass: CharacterClass;
  characterCulture: Culture;
  characterLineage: Lineage;
  coin: Scalars["Int"]["output"];
  counter: Scalars["Int"]["output"];
  createdBy: User;
  currentHealth?: Maybe<Scalars["Int"]["output"]>;
  currentStamina?: Maybe<Scalars["Int"]["output"]>;
  featureChoiceSlugs?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  heart: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  intellect: Scalars["Int"]["output"];
  items: Array<Maybe<Item>>;
  languages: Array<Maybe<Scalars["String"]["output"]>>;
  level: Scalars["Int"]["output"];
  maxHealth: Scalars["Int"]["output"];
  maxStamina: Scalars["Int"]["output"];
  mettle: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  rangeMax: Scalars["Int"]["output"];
  rangeMin: Scalars["Int"]["output"];
  shieldName: Scalars["String"]["output"];
};

export type CharacterClass = Rule & {
  __typename?: "CharacterClass";
  attackStat?: Maybe<Array<StatOptions>>;
  complexity?: Maybe<Complexity>;
  damage: Damage;
  deflect: Deflect;
  description: Array<Maybe<Scalars["String"]["output"]>>;
  extra?: Maybe<CharacterExtras>;
  features: Array<Maybe<CharacterClassFeature>>;
  health: Scalars["Int"]["output"];
  healthOnLevel: Scalars["Int"]["output"];
  href?: Maybe<Scalars["String"]["output"]>;
  range: Range;
  shortTitle?: Maybe<Scalars["String"]["output"]>;
  slug: Scalars["String"]["output"];
  stamina: Scalars["Int"]["output"];
  staminaOnLevel: Scalars["Int"]["output"];
  staminaStat: StatOptions;
  title: Scalars["String"]["output"];
  training: Training;
};

export type CharacterClassFeature = Feature & {
  __typename?: "CharacterClassFeature";
  actionType?: Maybe<Action>;
  choices?: Maybe<Array<FeatureChoices>>;
  chooseNum?: Maybe<Scalars["Int"]["output"]>;
  costsFortunesFavor: Scalars["Boolean"]["output"];
  href?: Maybe<Scalars["String"]["output"]>;
  level: Scalars["Int"]["output"];
  multiSelect?: Maybe<Scalars["Boolean"]["output"]>;
  ruleType?: Maybe<RuleType>;
  shortText?: Maybe<Scalars["String"]["output"]>;
  shortTitle?: Maybe<Scalars["String"]["output"]>;
  slug: Scalars["String"]["output"];
  staminaCost: Scalars["Int"]["output"];
  text?: Maybe<Array<Maybe<RuleText>>>;
  title: Scalars["String"]["output"];
};

export type CharacterExtras = {
  __typename?: "CharacterExtras";
  beastMasterPet?: Maybe<BeastmasterPet>;
  forms?: Maybe<Array<ShifterForm>>;
};

export type CharacterInput = {
  agility: Scalars["Int"]["input"];
  armorName: Scalars["String"]["input"];
  baseDamage: Scalars["Int"]["input"];
  characterClass: Scalars["String"]["input"];
  characterCulture: Scalars["String"]["input"];
  characterLineage: Scalars["String"]["input"];
  coin: Scalars["Int"]["input"];
  counter: Scalars["Int"]["input"];
  currentHealth?: InputMaybe<Scalars["Int"]["input"]>;
  currentStamina?: InputMaybe<Scalars["Int"]["input"]>;
  featureChoiceSlugs?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  heart: Scalars["Int"]["input"];
  intellect: Scalars["Int"]["input"];
  items?: InputMaybe<Array<InputMaybe<ItemInput>>>;
  languages: Array<InputMaybe<Scalars["String"]["input"]>>;
  level: Scalars["Int"]["input"];
  maxHealth: Scalars["Int"]["input"];
  maxStamina: Scalars["Int"]["input"];
  mettle: Scalars["Int"]["input"];
  name: Scalars["String"]["input"];
  rangeMax: Scalars["Int"]["input"];
  rangeMin: Scalars["Int"]["input"];
  shieldName: Scalars["String"]["input"];
};

export type Complexity = "COMPLEX" | "SIMPLE" | "STANDARD";

export type Culture = Rule & {
  __typename?: "Culture";
  description?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  href?: Maybe<Scalars["String"]["output"]>;
  languages?: Maybe<Scalars["String"]["output"]>;
  shortTitle?: Maybe<Scalars["String"]["output"]>;
  slug: Scalars["String"]["output"];
  stat?: Maybe<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
  traits?: Maybe<Array<GenericFeature>>;
};

export type Damage = {
  __typename?: "Damage";
  count: Scalars["Int"]["output"];
  dice: Scalars["Int"]["output"];
  stat?: Maybe<Array<StatOptions>>;
  type?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type Deflect = {
  __typename?: "Deflect";
  count: Scalars["Int"]["output"];
  dice: Scalars["Int"]["output"];
  flat?: Maybe<Scalars["Int"]["output"]>;
};

export type Effect = {
  __typename?: "Effect";
  condition?: Maybe<Scalars["String"]["output"]>;
  operation: Scalars["String"]["output"];
  target: Scalars["String"]["output"];
  value: Scalars["Int"]["output"];
};

export type EffectInput = {
  condition?: InputMaybe<Scalars["String"]["input"]>;
  operation: Scalars["String"]["input"];
  target: Scalars["String"]["input"];
  value: Scalars["Int"]["input"];
};

export type Feature = {
  actionType?: Maybe<Action>;
  costsFortunesFavor?: Maybe<Scalars["Boolean"]["output"]>;
  href?: Maybe<Scalars["String"]["output"]>;
  ruleType?: Maybe<RuleType>;
  shortText?: Maybe<Scalars["String"]["output"]>;
  shortTitle?: Maybe<Scalars["String"]["output"]>;
  slug: Scalars["String"]["output"];
  staminaCost?: Maybe<Scalars["Int"]["output"]>;
  text?: Maybe<Array<Maybe<RuleText>>>;
  title: Scalars["String"]["output"];
};

export type FeatureChoices = FeatureWithoutChoices | RuleText;

export type FeatureType = "NOVICE" | "VETERAN";

export type FeatureWithoutChoices = Feature & {
  __typename?: "FeatureWithoutChoices";
  actionType?: Maybe<Action>;
  costsFortunesFavor?: Maybe<Scalars["Boolean"]["output"]>;
  href?: Maybe<Scalars["String"]["output"]>;
  multiSelect?: Maybe<Scalars["Boolean"]["output"]>;
  ruleType?: Maybe<RuleType>;
  shortText?: Maybe<Scalars["String"]["output"]>;
  shortTitle?: Maybe<Scalars["String"]["output"]>;
  slug: Scalars["String"]["output"];
  staminaCost?: Maybe<Scalars["Int"]["output"]>;
  text?: Maybe<Array<Maybe<RuleText>>>;
  title: Scalars["String"]["output"];
};

export type GenericFeature = Feature & {
  __typename?: "GenericFeature";
  actionType?: Maybe<Action>;
  choices?: Maybe<Array<FeatureChoices>>;
  chooseNum?: Maybe<Scalars["Int"]["output"]>;
  costsFortunesFavor?: Maybe<Scalars["Boolean"]["output"]>;
  featureType?: Maybe<FeatureType>;
  href?: Maybe<Scalars["String"]["output"]>;
  multiSelect?: Maybe<Scalars["Boolean"]["output"]>;
  ruleType?: Maybe<RuleType>;
  shortText?: Maybe<Scalars["String"]["output"]>;
  shortTitle?: Maybe<Scalars["String"]["output"]>;
  slug: Scalars["String"]["output"];
  staminaCost?: Maybe<Scalars["Int"]["output"]>;
  text?: Maybe<Array<Maybe<RuleText>>>;
  title: Scalars["String"]["output"];
};

export type GenericRule = Rule & {
  __typename?: "GenericRule";
  href?: Maybe<Scalars["String"]["output"]>;
  lists?: Maybe<Array<Maybe<List>>>;
  ruleType?: Maybe<RuleType>;
  shortText?: Maybe<Scalars["String"]["output"]>;
  shortTitle?: Maybe<Scalars["String"]["output"]>;
  slug: Scalars["String"]["output"];
  subRules?: Maybe<Array<Maybe<GenericRule>>>;
  text?: Maybe<Array<Maybe<RuleText>>>;
  title: Scalars["String"]["output"];
};

export type Item = {
  __typename?: "Item";
  effects: Array<Maybe<Effect>>;
  id: Scalars["ID"]["output"];
  isMagic: Scalars["Boolean"]["output"];
  rarity?: Maybe<Rarity>;
  text: Array<Maybe<RuleText>>;
  title: Scalars["String"]["output"];
  uses?: Maybe<Uses>;
};

export type ItemInput = {
  effects: Array<InputMaybe<EffectInput>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  isMagic: Scalars["Boolean"]["input"];
  rarity?: InputMaybe<Rarity>;
  text: Array<InputMaybe<RuleTextInput>>;
  title: Scalars["String"]["input"];
  uses?: InputMaybe<UsesInput>;
};

export type Lineage = Rule & {
  __typename?: "Lineage";
  description?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  href?: Maybe<Scalars["String"]["output"]>;
  shortTitle?: Maybe<Scalars["String"]["output"]>;
  size?: Maybe<Array<Maybe<Size>>>;
  slug: Scalars["String"]["output"];
  speeds?: Maybe<Array<Maybe<Speed>>>;
  stat?: Maybe<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
  traits?: Maybe<Array<GenericFeature>>;
};

export type List = {
  __typename?: "List";
  items: Array<Maybe<Scalars["String"]["output"]>>;
  label?: Maybe<Scalars["String"]["output"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createCharacter?: Maybe<Character>;
  createUser?: Maybe<AuthPayload>;
  deleteCharacter?: Maybe<Scalars["Boolean"]["output"]>;
  login?: Maybe<AuthPayload>;
  updateCharacter?: Maybe<Character>;
};

export type MutationcreateCharacterArgs = {
  input?: InputMaybe<CharacterInput>;
};

export type MutationcreateUserArgs = {
  email: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  password: Scalars["String"]["input"];
};

export type MutationdeleteCharacterArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationloginArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationupdateCharacterArgs = {
  id: Scalars["ID"]["input"];
  input?: InputMaybe<CharacterInput>;
};

export type Query = {
  __typename?: "Query";
  character?: Maybe<Character>;
  characterClasses: Array<Maybe<CharacterClass>>;
  cultures: Array<Maybe<Culture>>;
  genericRules: Array<Maybe<GenericRule>>;
  lineages: Array<Maybe<Lineage>>;
  me?: Maybe<User>;
  searchAll: Array<Maybe<SearchResult>>;
  slugMap?: Maybe<Array<Maybe<SlugDict>>>;
  universalFeatures: Array<Maybe<GenericFeature>>;
  user?: Maybe<User>;
  users: Array<Maybe<User>>;
};

export type QuerycharacterArgs = {
  id: Scalars["ID"]["input"];
};

export type QuerycharacterClassesArgs = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
  version?: InputMaybe<VERSIONS>;
};

export type QueryculturesArgs = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
  version?: InputMaybe<VERSIONS>;
};

export type QuerygenericRulesArgs = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
  version?: InputMaybe<VERSIONS>;
};

export type QuerylineagesArgs = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
  version?: InputMaybe<VERSIONS>;
};

export type QuerysearchAllArgs = {
  phrase: Scalars["String"]["input"];
  version?: InputMaybe<VERSIONS>;
};

export type QueryuniversalFeaturesArgs = {
  featureType?: InputMaybe<FeatureType>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  version?: InputMaybe<VERSIONS>;
};

export type QueryuserArgs = {
  id: Scalars["ID"]["input"];
};

export type Range = {
  __typename?: "Range";
  max: Scalars["Int"]["output"];
  min: Scalars["Int"]["output"];
};

export type Rarity = "COMMON" | "LEGENDARY" | "RARE" | "UNCOMMON" | "UNIQUE";

export type RechargeOn =
  | "CATCH_BREATH"
  | "NIGHTS_REST"
  | "NONE"
  | "REST_AND_RECUPERATE";

export type Rule = {
  href?: Maybe<Scalars["String"]["output"]>;
  shortTitle?: Maybe<Scalars["String"]["output"]>;
  slug: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export type RuleText = {
  __typename?: "RuleText";
  choices?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  text: Scalars["String"]["output"];
  type?: Maybe<Scalars["String"]["output"]>;
};

export type RuleTextInput = {
  choices?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  text: Scalars["String"]["input"];
  type?: InputMaybe<Scalars["String"]["input"]>;
};

export type RuleType =
  | "ATTACK"
  | "CHOICE"
  | "EG"
  | "FLAVOR"
  | "LIST"
  | "LISTCOMPACT"
  | "RULE";

export type SearchResult = Rule & {
  __typename?: "SearchResult";
  href?: Maybe<Scalars["String"]["output"]>;
  page?: Maybe<Scalars["String"]["output"]>;
  shortTitle?: Maybe<Scalars["String"]["output"]>;
  slug: Scalars["String"]["output"];
  text?: Maybe<Array<Maybe<RuleText>>>;
  title: Scalars["String"]["output"];
  type?: Maybe<SearchResultSource>;
};

export type SearchResultSource =
  | "characterClass"
  | "culture"
  | "lineage"
  | "noviceFeature"
  | "rule"
  | "veteranFeature";

export type ShifterForm = Rule & {
  __typename?: "ShifterForm";
  armor?: Maybe<shifterArmor>;
  attackStat: StatOptions;
  damage: Array<Maybe<Damage>>;
  features?: Maybe<Array<Maybe<shifterFeature>>>;
  href?: Maybe<Scalars["String"]["output"]>;
  shortTitle?: Maybe<Scalars["String"]["output"]>;
  size: Size;
  slug: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export type Size =
  | "COLOSSAL"
  | "GIGANTIC"
  | "LARGE"
  | "MEDIUM"
  | "MINISCULE"
  | "SMALL"
  | "TINY";

export type SlugDict = {
  __typename?: "SlugDict";
  slug: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  url: Scalars["String"]["output"];
};

export type Speed = {
  __typename?: "Speed";
  speed: Scalars["Int"]["output"];
  type: SpeedTypes;
};

export type SpeedTypes = "flying" | "ground" | "swimming";

export type StatOptions = "AGILITY" | "HEART" | "INTELLECT" | "METTLE";

export type Training = {
  __typename?: "Training";
  armor?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  magic?: Maybe<TrainingOptions>;
  shields?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  weapons?: Maybe<Weapons>;
};

export type TrainingOptions = {
  __typename?: "TrainingOptions";
  options: Array<Scalars["String"]["output"]>;
  pick?: Maybe<Scalars["Int"]["output"]>;
};

export type User = {
  __typename?: "User";
  characters?: Maybe<Array<Maybe<Character>>>;
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
};

export type Uses = {
  __typename?: "Uses";
  max: Scalars["Int"]["output"];
  rechargeOn: RechargeOn;
  used: Scalars["Int"]["output"];
};

export type UsesInput = {
  max: Scalars["Int"]["input"];
  rechargeOn: RechargeOn;
  used: Scalars["Int"]["input"];
};

export type VERSIONS = "_1a" | "_1b";

export type Weapons = {
  __typename?: "Weapons";
  melee?: Maybe<TrainingOptions>;
  ranged?: Maybe<TrainingOptions>;
  special?: Maybe<TrainingOptions>;
};

export type shifterArmor = {
  __typename?: "shifterArmor";
  baseArmor: Scalars["Int"]["output"];
  stat?: Maybe<StatOptions>;
};

export type shifterFeature = {
  __typename?: "shifterFeature";
  text: Scalars["String"]["output"];
  title?: Maybe<Scalars["String"]["output"]>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  FeatureChoices:
    | (FeatureWithoutChoices & { __typename: "FeatureWithoutChoices" })
    | (RuleText & { __typename: "RuleText" });
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> =
  {
    Feature:
      | (Omit<CharacterClassFeature, "choices"> & {
          choices?: Maybe<Array<_RefType["FeatureChoices"]>>;
        } & { __typename: "CharacterClassFeature" })
      | (FeatureWithoutChoices & { __typename: "FeatureWithoutChoices" })
      | (Omit<GenericFeature, "choices"> & {
          choices?: Maybe<Array<_RefType["FeatureChoices"]>>;
        } & { __typename: "GenericFeature" });
    Rule:
      | (Omit<CharacterClass, "damage" | "features"> & {
          damage: _RefType["Damage"];
          features: Array<Maybe<_RefType["CharacterClassFeature"]>>;
        } & { __typename: "CharacterClass" })
      | (Omit<Culture, "traits"> & {
          traits?: Maybe<Array<_RefType["GenericFeature"]>>;
        } & { __typename: "Culture" })
      | (GenericRule & { __typename: "GenericRule" })
      | (Omit<Lineage, "traits"> & {
          traits?: Maybe<Array<_RefType["GenericFeature"]>>;
        } & { __typename: "Lineage" })
      | (SearchResult & { __typename: "SearchResult" })
      | (Omit<ShifterForm, "damage"> & {
          damage: Array<Maybe<_RefType["Damage"]>>;
        } & { __typename: "ShifterForm" });
  };

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Action: Action;
  AuthPayload: ResolverTypeWrapper<
    Omit<AuthPayload, "user"> & { user?: Maybe<ResolversTypes["User"]> }
  >;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  BeastAbility: ResolverTypeWrapper<BeastAbility>;
  BeastForm: ResolverTypeWrapper<
    Omit<BeastForm, "damage"> & { damage: ResolversTypes["Damage"] }
  >;
  BeastHealth: ResolverTypeWrapper<BeastHealth>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  BeastStats: ResolverTypeWrapper<BeastStats>;
  BeastmasterPet: ResolverTypeWrapper<BeastmasterPet>;
  Character: ResolverTypeWrapper<
    Omit<
      Character,
      "characterClass" | "characterCulture" | "characterLineage" | "createdBy"
    > & {
      characterClass: ResolversTypes["CharacterClass"];
      characterCulture: ResolversTypes["Culture"];
      characterLineage: ResolversTypes["Lineage"];
      createdBy: ResolversTypes["User"];
    }
  >;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  CharacterClass: ResolverTypeWrapper<
    Omit<CharacterClass, "damage" | "features"> & {
      damage: ResolversTypes["Damage"];
      features: Array<Maybe<ResolversTypes["CharacterClassFeature"]>>;
    }
  >;
  CharacterClassFeature: ResolverTypeWrapper<
    Omit<CharacterClassFeature, "choices"> & {
      choices?: Maybe<Array<ResolversTypes["FeatureChoices"]>>;
    }
  >;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  CharacterExtras: ResolverTypeWrapper<CharacterExtras>;
  CharacterInput: CharacterInput;
  Complexity: Complexity;
  Culture: ResolverTypeWrapper<
    Omit<Culture, "traits"> & {
      traits?: Maybe<Array<ResolversTypes["GenericFeature"]>>;
    }
  >;
  Damage: ResolverTypeWrapper<Damage>;
  Deflect: ResolverTypeWrapper<Deflect>;
  Effect: ResolverTypeWrapper<Effect>;
  EffectInput: EffectInput;
  Feature: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>["Feature"]
  >;
  FeatureChoices: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>["FeatureChoices"]
  >;
  FeatureType: FeatureType;
  FeatureWithoutChoices: ResolverTypeWrapper<FeatureWithoutChoices>;
  GenericFeature: ResolverTypeWrapper<
    Omit<GenericFeature, "choices"> & {
      choices?: Maybe<Array<ResolversTypes["FeatureChoices"]>>;
    }
  >;
  GenericRule: ResolverTypeWrapper<GenericRule>;
  Item: ResolverTypeWrapper<Item>;
  ItemInput: ItemInput;
  Lineage: ResolverTypeWrapper<
    Omit<Lineage, "traits"> & {
      traits?: Maybe<Array<ResolversTypes["GenericFeature"]>>;
    }
  >;
  List: ResolverTypeWrapper<List>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Range: ResolverTypeWrapper<Range>;
  Rarity: Rarity;
  RechargeOn: RechargeOn;
  Rule: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>["Rule"]>;
  RuleText: ResolverTypeWrapper<RuleText>;
  RuleTextInput: RuleTextInput;
  RuleType: RuleType;
  SearchResult: ResolverTypeWrapper<SearchResult>;
  SearchResultSource: SearchResultSource;
  ShifterForm: ResolverTypeWrapper<
    Omit<ShifterForm, "damage"> & {
      damage: Array<Maybe<ResolversTypes["Damage"]>>;
    }
  >;
  Size: Size;
  SlugDict: ResolverTypeWrapper<SlugDict>;
  Speed: ResolverTypeWrapper<Speed>;
  SpeedTypes: SpeedTypes;
  StatOptions: StatOptions;
  Training: ResolverTypeWrapper<Training>;
  TrainingOptions: ResolverTypeWrapper<TrainingOptions>;
  User: ResolverTypeWrapper<
    Omit<User, "characters"> & {
      characters?: Maybe<Array<Maybe<ResolversTypes["Character"]>>>;
    }
  >;
  Uses: ResolverTypeWrapper<Uses>;
  UsesInput: UsesInput;
  VERSIONS: VERSIONS;
  Weapons: ResolverTypeWrapper<Weapons>;
  shifterArmor: ResolverTypeWrapper<shifterArmor>;
  shifterFeature: ResolverTypeWrapper<shifterFeature>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: Omit<AuthPayload, "user"> & {
    user?: Maybe<ResolversParentTypes["User"]>;
  };
  String: Scalars["String"]["output"];
  BeastAbility: BeastAbility;
  BeastForm: Omit<BeastForm, "damage"> & {
    damage: ResolversParentTypes["Damage"];
  };
  BeastHealth: BeastHealth;
  Int: Scalars["Int"]["output"];
  BeastStats: BeastStats;
  BeastmasterPet: BeastmasterPet;
  Character: Omit<
    Character,
    "characterClass" | "characterCulture" | "characterLineage" | "createdBy"
  > & {
    characterClass: ResolversParentTypes["CharacterClass"];
    characterCulture: ResolversParentTypes["Culture"];
    characterLineage: ResolversParentTypes["Lineage"];
    createdBy: ResolversParentTypes["User"];
  };
  ID: Scalars["ID"]["output"];
  CharacterClass: Omit<CharacterClass, "damage" | "features"> & {
    damage: ResolversParentTypes["Damage"];
    features: Array<Maybe<ResolversParentTypes["CharacterClassFeature"]>>;
  };
  CharacterClassFeature: Omit<CharacterClassFeature, "choices"> & {
    choices?: Maybe<Array<ResolversParentTypes["FeatureChoices"]>>;
  };
  Boolean: Scalars["Boolean"]["output"];
  CharacterExtras: CharacterExtras;
  CharacterInput: CharacterInput;
  Culture: Omit<Culture, "traits"> & {
    traits?: Maybe<Array<ResolversParentTypes["GenericFeature"]>>;
  };
  Damage: Damage;
  Deflect: Deflect;
  Effect: Effect;
  EffectInput: EffectInput;
  Feature: ResolversInterfaceTypes<ResolversParentTypes>["Feature"];
  FeatureChoices: ResolversUnionTypes<ResolversParentTypes>["FeatureChoices"];
  FeatureWithoutChoices: FeatureWithoutChoices;
  GenericFeature: Omit<GenericFeature, "choices"> & {
    choices?: Maybe<Array<ResolversParentTypes["FeatureChoices"]>>;
  };
  GenericRule: GenericRule;
  Item: Item;
  ItemInput: ItemInput;
  Lineage: Omit<Lineage, "traits"> & {
    traits?: Maybe<Array<ResolversParentTypes["GenericFeature"]>>;
  };
  List: List;
  Mutation: {};
  Query: {};
  Range: Range;
  Rule: ResolversInterfaceTypes<ResolversParentTypes>["Rule"];
  RuleText: RuleText;
  RuleTextInput: RuleTextInput;
  SearchResult: SearchResult;
  ShifterForm: Omit<ShifterForm, "damage"> & {
    damage: Array<Maybe<ResolversParentTypes["Damage"]>>;
  };
  SlugDict: SlugDict;
  Speed: Speed;
  Training: Training;
  TrainingOptions: TrainingOptions;
  User: Omit<User, "characters"> & {
    characters?: Maybe<Array<Maybe<ResolversParentTypes["Character"]>>>;
  };
  Uses: Uses;
  UsesInput: UsesInput;
  Weapons: Weapons;
  shifterArmor: shifterArmor;
  shifterFeature: shifterFeature;
};

export type AuthPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["AuthPayload"] = ResolversParentTypes["AuthPayload"],
> = {
  token?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BeastAbilityResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BeastAbility"] = ResolversParentTypes["BeastAbility"],
> = {
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BeastFormResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BeastForm"] = ResolversParentTypes["BeastForm"],
> = {
  abilities?: Resolver<
    Array<ResolversTypes["BeastAbility"]>,
    ParentType,
    ContextType
  >;
  damage?: Resolver<ResolversTypes["Damage"], ParentType, ContextType>;
  health?: Resolver<ResolversTypes["BeastHealth"], ParentType, ContextType>;
  size?: Resolver<ResolversTypes["Size"], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  speed?: Resolver<Array<ResolversTypes["Speed"]>, ParentType, ContextType>;
  stats?: Resolver<ResolversTypes["BeastStats"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BeastHealthResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BeastHealth"] = ResolversParentTypes["BeastHealth"],
> = {
  base?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  perLevel?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BeastStatsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BeastStats"] = ResolversParentTypes["BeastStats"],
> = {
  agility?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  heart?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  intellect?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  mettle?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BeastmasterPetResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BeastmasterPet"] = ResolversParentTypes["BeastmasterPet"],
> = {
  beasts?: Resolver<
    Array<ResolversTypes["BeastForm"]>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Array<Maybe<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CharacterResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Character"] = ResolversParentTypes["Character"],
> = {
  agility?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  armorName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  baseDamage?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  characterClass?: Resolver<
    ResolversTypes["CharacterClass"],
    ParentType,
    ContextType
  >;
  characterCulture?: Resolver<
    ResolversTypes["Culture"],
    ParentType,
    ContextType
  >;
  characterLineage?: Resolver<
    ResolversTypes["Lineage"],
    ParentType,
    ContextType
  >;
  coin?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  counter?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  currentHealth?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  currentStamina?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  featureChoiceSlugs?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  heart?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  intellect?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  items?: Resolver<
    Array<Maybe<ResolversTypes["Item"]>>,
    ParentType,
    ContextType
  >;
  languages?: Resolver<
    Array<Maybe<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  level?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  maxHealth?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  maxStamina?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  mettle?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  rangeMax?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  rangeMin?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  shieldName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CharacterClassResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CharacterClass"] = ResolversParentTypes["CharacterClass"],
> = {
  attackStat?: Resolver<
    Maybe<Array<ResolversTypes["StatOptions"]>>,
    ParentType,
    ContextType
  >;
  complexity?: Resolver<
    Maybe<ResolversTypes["Complexity"]>,
    ParentType,
    ContextType
  >;
  damage?: Resolver<ResolversTypes["Damage"], ParentType, ContextType>;
  deflect?: Resolver<ResolversTypes["Deflect"], ParentType, ContextType>;
  description?: Resolver<
    Array<Maybe<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  extra?: Resolver<
    Maybe<ResolversTypes["CharacterExtras"]>,
    ParentType,
    ContextType
  >;
  features?: Resolver<
    Array<Maybe<ResolversTypes["CharacterClassFeature"]>>,
    ParentType,
    ContextType
  >;
  health?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  healthOnLevel?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  href?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  range?: Resolver<ResolversTypes["Range"], ParentType, ContextType>;
  shortTitle?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  stamina?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  staminaOnLevel?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  staminaStat?: Resolver<
    ResolversTypes["StatOptions"],
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  training?: Resolver<ResolversTypes["Training"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CharacterClassFeatureResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CharacterClassFeature"] = ResolversParentTypes["CharacterClassFeature"],
> = {
  actionType?: Resolver<
    Maybe<ResolversTypes["Action"]>,
    ParentType,
    ContextType
  >;
  choices?: Resolver<
    Maybe<Array<ResolversTypes["FeatureChoices"]>>,
    ParentType,
    ContextType
  >;
  chooseNum?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  costsFortunesFavor?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  href?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  level?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  multiSelect?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  ruleType?: Resolver<
    Maybe<ResolversTypes["RuleType"]>,
    ParentType,
    ContextType
  >;
  shortText?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  shortTitle?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  staminaCost?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  text?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["RuleText"]>>>,
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CharacterExtrasResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CharacterExtras"] = ResolversParentTypes["CharacterExtras"],
> = {
  beastMasterPet?: Resolver<
    Maybe<ResolversTypes["BeastmasterPet"]>,
    ParentType,
    ContextType
  >;
  forms?: Resolver<
    Maybe<Array<ResolversTypes["ShifterForm"]>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CultureResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Culture"] = ResolversParentTypes["Culture"],
> = {
  description?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  href?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  languages?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  shortTitle?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  stat?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  traits?: Resolver<
    Maybe<Array<ResolversTypes["GenericFeature"]>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DamageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Damage"] = ResolversParentTypes["Damage"],
> = {
  count?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  dice?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  stat?: Resolver<
    Maybe<Array<ResolversTypes["StatOptions"]>>,
    ParentType,
    ContextType
  >;
  type?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeflectResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Deflect"] = ResolversParentTypes["Deflect"],
> = {
  count?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  dice?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  flat?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EffectResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Effect"] = ResolversParentTypes["Effect"],
> = {
  condition?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  operation?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  target?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  value?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatureResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Feature"] = ResolversParentTypes["Feature"],
> = {
  __resolveType?: TypeResolveFn<
    "CharacterClassFeature" | "FeatureWithoutChoices" | "GenericFeature",
    ParentType,
    ContextType
  >;
  actionType?: Resolver<
    Maybe<ResolversTypes["Action"]>,
    ParentType,
    ContextType
  >;
  costsFortunesFavor?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  href?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  ruleType?: Resolver<
    Maybe<ResolversTypes["RuleType"]>,
    ParentType,
    ContextType
  >;
  shortText?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  shortTitle?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  staminaCost?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  text?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["RuleText"]>>>,
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type FeatureChoicesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatureChoices"] = ResolversParentTypes["FeatureChoices"],
> = {
  __resolveType?: TypeResolveFn<
    "FeatureWithoutChoices" | "RuleText",
    ParentType,
    ContextType
  >;
};

export type FeatureWithoutChoicesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatureWithoutChoices"] = ResolversParentTypes["FeatureWithoutChoices"],
> = {
  actionType?: Resolver<
    Maybe<ResolversTypes["Action"]>,
    ParentType,
    ContextType
  >;
  costsFortunesFavor?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  href?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  multiSelect?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  ruleType?: Resolver<
    Maybe<ResolversTypes["RuleType"]>,
    ParentType,
    ContextType
  >;
  shortText?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  shortTitle?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  staminaCost?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  text?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["RuleText"]>>>,
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenericFeatureResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["GenericFeature"] = ResolversParentTypes["GenericFeature"],
> = {
  actionType?: Resolver<
    Maybe<ResolversTypes["Action"]>,
    ParentType,
    ContextType
  >;
  choices?: Resolver<
    Maybe<Array<ResolversTypes["FeatureChoices"]>>,
    ParentType,
    ContextType
  >;
  chooseNum?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  costsFortunesFavor?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  featureType?: Resolver<
    Maybe<ResolversTypes["FeatureType"]>,
    ParentType,
    ContextType
  >;
  href?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  multiSelect?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  ruleType?: Resolver<
    Maybe<ResolversTypes["RuleType"]>,
    ParentType,
    ContextType
  >;
  shortText?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  shortTitle?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  staminaCost?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  text?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["RuleText"]>>>,
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenericRuleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["GenericRule"] = ResolversParentTypes["GenericRule"],
> = {
  href?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  lists?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["List"]>>>,
    ParentType,
    ContextType
  >;
  ruleType?: Resolver<
    Maybe<ResolversTypes["RuleType"]>,
    ParentType,
    ContextType
  >;
  shortText?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  shortTitle?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  subRules?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["GenericRule"]>>>,
    ParentType,
    ContextType
  >;
  text?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["RuleText"]>>>,
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Item"] = ResolversParentTypes["Item"],
> = {
  effects?: Resolver<
    Array<Maybe<ResolversTypes["Effect"]>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  isMagic?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  rarity?: Resolver<Maybe<ResolversTypes["Rarity"]>, ParentType, ContextType>;
  text?: Resolver<
    Array<Maybe<ResolversTypes["RuleText"]>>,
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  uses?: Resolver<Maybe<ResolversTypes["Uses"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LineageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Lineage"] = ResolversParentTypes["Lineage"],
> = {
  description?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  href?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  shortTitle?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  size?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Size"]>>>,
    ParentType,
    ContextType
  >;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  speeds?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Speed"]>>>,
    ParentType,
    ContextType
  >;
  stat?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  traits?: Resolver<
    Maybe<Array<ResolversTypes["GenericFeature"]>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ListResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["List"] = ResolversParentTypes["List"],
> = {
  items?: Resolver<
    Array<Maybe<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  label?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
  createCharacter?: Resolver<
    Maybe<ResolversTypes["Character"]>,
    ParentType,
    ContextType,
    Partial<MutationcreateCharacterArgs>
  >;
  createUser?: Resolver<
    Maybe<ResolversTypes["AuthPayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationcreateUserArgs, "email" | "password">
  >;
  deleteCharacter?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationdeleteCharacterArgs, "id">
  >;
  login?: Resolver<
    Maybe<ResolversTypes["AuthPayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationloginArgs, "email" | "password">
  >;
  updateCharacter?: Resolver<
    Maybe<ResolversTypes["Character"]>,
    ParentType,
    ContextType,
    RequireFields<MutationupdateCharacterArgs, "id">
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  character?: Resolver<
    Maybe<ResolversTypes["Character"]>,
    ParentType,
    ContextType,
    RequireFields<QuerycharacterArgs, "id">
  >;
  characterClasses?: Resolver<
    Array<Maybe<ResolversTypes["CharacterClass"]>>,
    ParentType,
    ContextType,
    Partial<QuerycharacterClassesArgs>
  >;
  cultures?: Resolver<
    Array<Maybe<ResolversTypes["Culture"]>>,
    ParentType,
    ContextType,
    Partial<QueryculturesArgs>
  >;
  genericRules?: Resolver<
    Array<Maybe<ResolversTypes["GenericRule"]>>,
    ParentType,
    ContextType,
    Partial<QuerygenericRulesArgs>
  >;
  lineages?: Resolver<
    Array<Maybe<ResolversTypes["Lineage"]>>,
    ParentType,
    ContextType,
    Partial<QuerylineagesArgs>
  >;
  me?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  searchAll?: Resolver<
    Array<Maybe<ResolversTypes["SearchResult"]>>,
    ParentType,
    ContextType,
    RequireFields<QuerysearchAllArgs, "phrase">
  >;
  slugMap?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SlugDict"]>>>,
    ParentType,
    ContextType
  >;
  universalFeatures?: Resolver<
    Array<Maybe<ResolversTypes["GenericFeature"]>>,
    ParentType,
    ContextType,
    Partial<QueryuniversalFeaturesArgs>
  >;
  user?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryuserArgs, "id">
  >;
  users?: Resolver<
    Array<Maybe<ResolversTypes["User"]>>,
    ParentType,
    ContextType
  >;
};

export type RangeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Range"] = ResolversParentTypes["Range"],
> = {
  max?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  min?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RuleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Rule"] = ResolversParentTypes["Rule"],
> = {
  __resolveType?: TypeResolveFn<
    | "CharacterClass"
    | "Culture"
    | "GenericRule"
    | "Lineage"
    | "SearchResult"
    | "ShifterForm",
    ParentType,
    ContextType
  >;
  href?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  shortTitle?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type RuleTextResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RuleText"] = ResolversParentTypes["RuleText"],
> = {
  choices?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SearchResult"] = ResolversParentTypes["SearchResult"],
> = {
  href?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  page?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  shortTitle?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  text?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["RuleText"]>>>,
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  type?: Resolver<
    Maybe<ResolversTypes["SearchResultSource"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShifterFormResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ShifterForm"] = ResolversParentTypes["ShifterForm"],
> = {
  armor?: Resolver<
    Maybe<ResolversTypes["shifterArmor"]>,
    ParentType,
    ContextType
  >;
  attackStat?: Resolver<ResolversTypes["StatOptions"], ParentType, ContextType>;
  damage?: Resolver<
    Array<Maybe<ResolversTypes["Damage"]>>,
    ParentType,
    ContextType
  >;
  features?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["shifterFeature"]>>>,
    ParentType,
    ContextType
  >;
  href?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  shortTitle?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  size?: Resolver<ResolversTypes["Size"], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SlugDictResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SlugDict"] = ResolversParentTypes["SlugDict"],
> = {
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  url?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpeedResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Speed"] = ResolversParentTypes["Speed"],
> = {
  speed?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["SpeedTypes"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrainingResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Training"] = ResolversParentTypes["Training"],
> = {
  armor?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  magic?: Resolver<
    Maybe<ResolversTypes["TrainingOptions"]>,
    ParentType,
    ContextType
  >;
  shields?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  weapons?: Resolver<Maybe<ResolversTypes["Weapons"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrainingOptionsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["TrainingOptions"] = ResolversParentTypes["TrainingOptions"],
> = {
  options?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  pick?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["User"] = ResolversParentTypes["User"],
> = {
  characters?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Character"]>>>,
    ParentType,
    ContextType
  >;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Uses"] = ResolversParentTypes["Uses"],
> = {
  max?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  rechargeOn?: Resolver<ResolversTypes["RechargeOn"], ParentType, ContextType>;
  used?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WeaponsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Weapons"] = ResolversParentTypes["Weapons"],
> = {
  melee?: Resolver<
    Maybe<ResolversTypes["TrainingOptions"]>,
    ParentType,
    ContextType
  >;
  ranged?: Resolver<
    Maybe<ResolversTypes["TrainingOptions"]>,
    ParentType,
    ContextType
  >;
  special?: Resolver<
    Maybe<ResolversTypes["TrainingOptions"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type shifterArmorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["shifterArmor"] = ResolversParentTypes["shifterArmor"],
> = {
  baseArmor?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  stat?: Resolver<
    Maybe<ResolversTypes["StatOptions"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type shifterFeatureResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["shifterFeature"] = ResolversParentTypes["shifterFeature"],
> = {
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  BeastAbility?: BeastAbilityResolvers<ContextType>;
  BeastForm?: BeastFormResolvers<ContextType>;
  BeastHealth?: BeastHealthResolvers<ContextType>;
  BeastStats?: BeastStatsResolvers<ContextType>;
  BeastmasterPet?: BeastmasterPetResolvers<ContextType>;
  Character?: CharacterResolvers<ContextType>;
  CharacterClass?: CharacterClassResolvers<ContextType>;
  CharacterClassFeature?: CharacterClassFeatureResolvers<ContextType>;
  CharacterExtras?: CharacterExtrasResolvers<ContextType>;
  Culture?: CultureResolvers<ContextType>;
  Damage?: DamageResolvers<ContextType>;
  Deflect?: DeflectResolvers<ContextType>;
  Effect?: EffectResolvers<ContextType>;
  Feature?: FeatureResolvers<ContextType>;
  FeatureChoices?: FeatureChoicesResolvers<ContextType>;
  FeatureWithoutChoices?: FeatureWithoutChoicesResolvers<ContextType>;
  GenericFeature?: GenericFeatureResolvers<ContextType>;
  GenericRule?: GenericRuleResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  Lineage?: LineageResolvers<ContextType>;
  List?: ListResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Range?: RangeResolvers<ContextType>;
  Rule?: RuleResolvers<ContextType>;
  RuleText?: RuleTextResolvers<ContextType>;
  SearchResult?: SearchResultResolvers<ContextType>;
  ShifterForm?: ShifterFormResolvers<ContextType>;
  SlugDict?: SlugDictResolvers<ContextType>;
  Speed?: SpeedResolvers<ContextType>;
  Training?: TrainingResolvers<ContextType>;
  TrainingOptions?: TrainingOptionsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Uses?: UsesResolvers<ContextType>;
  Weapons?: WeaponsResolvers<ContextType>;
  shifterArmor?: shifterArmorResolvers<ContextType>;
  shifterFeature?: shifterFeatureResolvers<ContextType>;
};
