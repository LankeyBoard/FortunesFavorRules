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
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Action = "ACTION" | "COUNTER";

export type CharacterClass = Rule & {
  __typename?: "CharacterClass";
  attackStat?: Maybe<Array<Stat>>;
  complexity?: Maybe<Complexity>;
  damage: Damage;
  description: Array<Maybe<Scalars["String"]["output"]>>;
  extra?: Maybe<ShifterForms>;
  features: Array<Maybe<CharacterClassFeature>>;
  health: Scalars["Int"]["output"];
  healthOnLevel: Scalars["Int"]["output"];
  href?: Maybe<Scalars["String"]["output"]>;
  range: Range;
  shortTitle?: Maybe<Scalars["String"]["output"]>;
  slug: Scalars["String"]["output"];
  stamina: Scalars["Int"]["output"];
  staminaOnLevel: Scalars["Int"]["output"];
  staminaStat: Stat;
  title: Scalars["String"]["output"];
  training: Training;
};

export type CharacterClassFeature = Rule & {
  __typename?: "CharacterClassFeature";
  actionType?: Maybe<Action>;
  choices?: Maybe<Array<Maybe<GenericFeature>>>;
  costsFortunesFavor: Scalars["Boolean"]["output"];
  href?: Maybe<Scalars["String"]["output"]>;
  level: Scalars["Int"]["output"];
  ruleType?: Maybe<RuleType>;
  rules?: Maybe<Array<Maybe<RuleText>>>;
  shortTitle?: Maybe<Scalars["String"]["output"]>;
  slug: Scalars["String"]["output"];
  staminaCost: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
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
  traits?: Maybe<Array<Maybe<GenericRule>>>;
};

export type Damage = {
  __typename?: "Damage";
  count: Scalars["Int"]["output"];
  dice: Scalars["Int"]["output"];
  stat?: Maybe<Stat>;
  type?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type FeatureType = "NOVICE" | "VETERAN";

export type GenericFeature = Rule & {
  __typename?: "GenericFeature";
  actionType?: Maybe<Action>;
  choices?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
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

export type GenericRule = Rule & {
  __typename?: "GenericRule";
  href?: Maybe<Scalars["String"]["output"]>;
  list?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  ruleType?: Maybe<RuleType>;
  rules?: Maybe<Array<Maybe<GenericRule>>>;
  shortText?: Maybe<Scalars["String"]["output"]>;
  shortTitle?: Maybe<Scalars["String"]["output"]>;
  slug: Scalars["String"]["output"];
  text?: Maybe<Array<Maybe<RuleText>>>;
  title: Scalars["String"]["output"];
};

export type Lineage = Rule & {
  __typename?: "Lineage";
  description?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  href?: Maybe<Scalars["String"]["output"]>;
  shortTitle?: Maybe<Scalars["String"]["output"]>;
  size?: Maybe<Array<Maybe<Size>>>;
  slug: Scalars["String"]["output"];
  speed?: Maybe<Scalars["Int"]["output"]>;
  stat?: Maybe<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
  traits?: Maybe<Array<Maybe<GenericRule>>>;
};

export type Options = {
  __typename?: "Options";
  options: Array<Scalars["String"]["output"]>;
  pick?: Maybe<Scalars["Int"]["output"]>;
};

export type Query = {
  __typename?: "Query";
  characterClasses: Array<Maybe<CharacterClass>>;
  cultures: Array<Maybe<Culture>>;
  genericFeatures: Array<Maybe<GenericFeature>>;
  genericRules: Array<Maybe<GenericRule>>;
  lineages: Array<Maybe<Lineage>>;
  searchAll: Array<Maybe<SearchResult>>;
  slugMap?: Maybe<Array<Maybe<SlugDict>>>;
};

export type QuerycharacterClassesArgs = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryculturesArgs = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QuerygenericFeaturesArgs = {
  featureType?: InputMaybe<FeatureType>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QuerygenericRulesArgs = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QuerylineagesArgs = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QuerysearchAllArgs = {
  phrase: Scalars["String"]["input"];
};

export type Range = {
  __typename?: "Range";
  max: Scalars["Int"]["output"];
  min: Scalars["Int"]["output"];
};

export type Rule = {
  href?: Maybe<Scalars["String"]["output"]>;
  shortTitle?: Maybe<Scalars["String"]["output"]>;
  slug: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export type RuleText = {
  __typename?: "RuleText";
  options?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  text: Scalars["String"]["output"];
  type?: Maybe<RuleType>;
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
  attackStat: Stat;
  damage: Array<Maybe<Damage>>;
  features?: Maybe<Array<Maybe<shifterFeature>>>;
  href?: Maybe<Scalars["String"]["output"]>;
  shortTitle?: Maybe<Scalars["String"]["output"]>;
  size: Size;
  slug: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export type ShifterForms = {
  __typename?: "ShifterForms";
  forms?: Maybe<Array<Maybe<ShifterForm>>>;
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

export type Stat = "AGILITY" | "HEART" | "INTELLECT" | "METTLE";

export type Training = {
  __typename?: "Training";
  armor?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  magic?: Maybe<Options>;
  shields?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  weapons?: Maybe<Weapons>;
};

export type Weapons = {
  __typename?: "Weapons";
  melee?: Maybe<Options>;
  ranged?: Maybe<Options>;
  special?: Maybe<Options>;
};

export type shifterArmor = {
  __typename?: "shifterArmor";
  baseArmor: Scalars["Int"]["output"];
  stat?: Maybe<Stat>;
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

/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = {
  Rule:
    | (CharacterClass & { __typename: "CharacterClass" })
    | (CharacterClassFeature & { __typename: "CharacterClassFeature" })
    | (Culture & { __typename: "Culture" })
    | (GenericFeature & { __typename: "GenericFeature" })
    | (GenericRule & { __typename: "GenericRule" })
    | (Lineage & { __typename: "Lineage" })
    | (SearchResult & { __typename: "SearchResult" })
    | (ShifterForm & { __typename: "ShifterForm" });
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Action: Action;
  CharacterClass: ResolverTypeWrapper<CharacterClass>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  CharacterClassFeature: ResolverTypeWrapper<CharacterClassFeature>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  Complexity: Complexity;
  Culture: ResolverTypeWrapper<Culture>;
  Damage: ResolverTypeWrapper<Damage>;
  FeatureType: FeatureType;
  GenericFeature: ResolverTypeWrapper<GenericFeature>;
  GenericRule: ResolverTypeWrapper<GenericRule>;
  Lineage: ResolverTypeWrapper<Lineage>;
  Options: ResolverTypeWrapper<Options>;
  Query: ResolverTypeWrapper<{}>;
  Range: ResolverTypeWrapper<Range>;
  Rule: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>["Rule"]>;
  RuleText: ResolverTypeWrapper<RuleText>;
  RuleType: RuleType;
  SearchResult: ResolverTypeWrapper<SearchResult>;
  SearchResultSource: SearchResultSource;
  ShifterForm: ResolverTypeWrapper<ShifterForm>;
  ShifterForms: ResolverTypeWrapper<ShifterForms>;
  Size: Size;
  SlugDict: ResolverTypeWrapper<SlugDict>;
  Stat: Stat;
  Training: ResolverTypeWrapper<Training>;
  Weapons: ResolverTypeWrapper<Weapons>;
  shifterArmor: ResolverTypeWrapper<shifterArmor>;
  shifterFeature: ResolverTypeWrapper<shifterFeature>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  CharacterClass: CharacterClass;
  String: Scalars["String"]["output"];
  Int: Scalars["Int"]["output"];
  CharacterClassFeature: CharacterClassFeature;
  Boolean: Scalars["Boolean"]["output"];
  Culture: Culture;
  Damage: Damage;
  GenericFeature: GenericFeature;
  GenericRule: GenericRule;
  Lineage: Lineage;
  Options: Options;
  Query: {};
  Range: Range;
  Rule: ResolversInterfaceTypes<ResolversParentTypes>["Rule"];
  RuleText: RuleText;
  SearchResult: SearchResult;
  ShifterForm: ShifterForm;
  ShifterForms: ShifterForms;
  SlugDict: SlugDict;
  Training: Training;
  Weapons: Weapons;
  shifterArmor: shifterArmor;
  shifterFeature: shifterFeature;
};

export type CharacterClassResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CharacterClass"] = ResolversParentTypes["CharacterClass"],
> = {
  attackStat?: Resolver<
    Maybe<Array<ResolversTypes["Stat"]>>,
    ParentType,
    ContextType
  >;
  complexity?: Resolver<
    Maybe<ResolversTypes["Complexity"]>,
    ParentType,
    ContextType
  >;
  damage?: Resolver<ResolversTypes["Damage"], ParentType, ContextType>;
  description?: Resolver<
    Array<Maybe<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  extra?: Resolver<
    Maybe<ResolversTypes["ShifterForms"]>,
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
  staminaStat?: Resolver<ResolversTypes["Stat"], ParentType, ContextType>;
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
    Maybe<Array<Maybe<ResolversTypes["GenericFeature"]>>>,
    ParentType,
    ContextType
  >;
  costsFortunesFavor?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  href?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  level?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  ruleType?: Resolver<
    Maybe<ResolversTypes["RuleType"]>,
    ParentType,
    ContextType
  >;
  rules?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["RuleText"]>>>,
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
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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
    Maybe<Array<Maybe<ResolversTypes["GenericRule"]>>>,
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
  stat?: Resolver<Maybe<ResolversTypes["Stat"]>, ParentType, ContextType>;
  type?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
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
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
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

export type GenericRuleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["GenericRule"] = ResolversParentTypes["GenericRule"],
> = {
  href?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  list?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  ruleType?: Resolver<
    Maybe<ResolversTypes["RuleType"]>,
    ParentType,
    ContextType
  >;
  rules?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["GenericRule"]>>>,
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
  text?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["RuleText"]>>>,
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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
  speed?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  stat?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  traits?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["GenericRule"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Options"] = ResolversParentTypes["Options"],
> = {
  options?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  pick?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
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
  genericFeatures?: Resolver<
    Array<Maybe<ResolversTypes["GenericFeature"]>>,
    ParentType,
    ContextType,
    Partial<QuerygenericFeaturesArgs>
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
    | "CharacterClassFeature"
    | "Culture"
    | "GenericFeature"
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
  options?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["RuleType"]>, ParentType, ContextType>;
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
  attackStat?: Resolver<ResolversTypes["Stat"], ParentType, ContextType>;
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

export type ShifterFormsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ShifterForms"] = ResolversParentTypes["ShifterForms"],
> = {
  forms?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ShifterForm"]>>>,
    ParentType,
    ContextType
  >;
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
  magic?: Resolver<Maybe<ResolversTypes["Options"]>, ParentType, ContextType>;
  shields?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  weapons?: Resolver<Maybe<ResolversTypes["Weapons"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WeaponsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Weapons"] = ResolversParentTypes["Weapons"],
> = {
  melee?: Resolver<Maybe<ResolversTypes["Options"]>, ParentType, ContextType>;
  ranged?: Resolver<Maybe<ResolversTypes["Options"]>, ParentType, ContextType>;
  special?: Resolver<Maybe<ResolversTypes["Options"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type shifterArmorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["shifterArmor"] = ResolversParentTypes["shifterArmor"],
> = {
  baseArmor?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  stat?: Resolver<Maybe<ResolversTypes["Stat"]>, ParentType, ContextType>;
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
  CharacterClass?: CharacterClassResolvers<ContextType>;
  CharacterClassFeature?: CharacterClassFeatureResolvers<ContextType>;
  Culture?: CultureResolvers<ContextType>;
  Damage?: DamageResolvers<ContextType>;
  GenericFeature?: GenericFeatureResolvers<ContextType>;
  GenericRule?: GenericRuleResolvers<ContextType>;
  Lineage?: LineageResolvers<ContextType>;
  Options?: OptionsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Range?: RangeResolvers<ContextType>;
  Rule?: RuleResolvers<ContextType>;
  RuleText?: RuleTextResolvers<ContextType>;
  SearchResult?: SearchResultResolvers<ContextType>;
  ShifterForm?: ShifterFormResolvers<ContextType>;
  ShifterForms?: ShifterFormsResolvers<ContextType>;
  SlugDict?: SlugDictResolvers<ContextType>;
  Training?: TrainingResolvers<ContextType>;
  Weapons?: WeaponsResolvers<ContextType>;
  shifterArmor?: shifterArmorResolvers<ContextType>;
  shifterFeature?: shifterFeatureResolvers<ContextType>;
};
