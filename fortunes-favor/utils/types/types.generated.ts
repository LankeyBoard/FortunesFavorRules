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
  armor: Scalars["Int"]["output"];
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

export type Campaign = {
  __typename?: "Campaign";
  characters: Array<Maybe<Character>>;
  description: Scalars["String"]["output"];
  endDate?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  owner: User;
  shops: Array<Maybe<ItemShop>>;
  startDate: Scalars["String"]["output"];
  status: CampaignStatus;
};

export type CampaignInput = {
  description: Scalars["String"]["input"];
  endDate?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  startDate: Scalars["String"]["input"];
  status: CampaignStatus;
};

export type CampaignStatus =
  | "ACTIVE"
  | "CANCELLED"
  | "COMPLETED"
  | "ON_HOLD"
  | "PLANNING";

export type Character = {
  __typename?: "Character";
  agility: Scalars["Int"]["output"];
  armorName: Scalars["String"]["output"];
  baseDamage: Scalars["Int"]["output"];
  campaign?: Maybe<Campaign>;
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
  maxSlots: Scalars["Int"]["output"];
  maxStamina: Scalars["Int"]["output"];
  mettle: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  rangeMax: Scalars["Int"]["output"];
  rangeMin: Scalars["Int"]["output"];
  shieldName: Scalars["String"]["output"];
  slots: Scalars["Int"]["output"];
  spells: Array<Maybe<Spell>>;
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
  img?: Maybe<Img>;
  range: Range;
  shortTitle?: Maybe<Scalars["String"]["output"]>;
  slug: Scalars["String"]["output"];
  stamina: Scalars["Int"]["output"];
  staminaOnLevel: Scalars["Int"]["output"];
  staminaStat: StatOptions;
  title: Scalars["String"]["output"];
  training: Training;
  variants?: Maybe<Array<Maybe<CharacterClassVariant>>>;
};

export type CharacterClassFeature = Feature & {
  __typename?: "CharacterClassFeature";
  actionType?: Maybe<Action>;
  choices?: Maybe<Array<FeatureChoices>>;
  chooseNum?: Maybe<Scalars["Int"]["output"]>;
  costsFortunesFavor: Scalars["Boolean"]["output"];
  href?: Maybe<Scalars["String"]["output"]>;
  img?: Maybe<Img>;
  isVariant?: Maybe<Scalars["Boolean"]["output"]>;
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

export type CharacterClassVariant = Rule & {
  __typename?: "CharacterClassVariant";
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
  img?: Maybe<Img>;
  range: Range;
  shortTitle?: Maybe<Scalars["String"]["output"]>;
  slug: Scalars["String"]["output"];
  stamina: Scalars["Int"]["output"];
  staminaOnLevel: Scalars["Int"]["output"];
  staminaStat: StatOptions;
  title: Scalars["String"]["output"];
  training: Training;
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
  img?: Maybe<Img>;
  languages?: Maybe<Scalars["String"]["output"]>;
  shortTitle?: Maybe<Scalars["String"]["output"]>;
  slug: Scalars["String"]["output"];
  stat?: Maybe<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
  traits?: Maybe<Array<GenericFeature>>;
  variants?: Maybe<Array<Maybe<CultureVariant>>>;
};

export type CultureVariant = Rule & {
  __typename?: "CultureVariant";
  description?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  href?: Maybe<Scalars["String"]["output"]>;
  img?: Maybe<Img>;
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
  img?: Maybe<Img>;
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
  img?: Maybe<Img>;
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
  img?: Maybe<Img>;
  isVariant?: Maybe<Scalars["Boolean"]["output"]>;
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
  img?: Maybe<Img>;
  lists?: Maybe<Array<Maybe<List>>>;
  ruleType?: Maybe<RuleType>;
  shortText?: Maybe<Scalars["String"]["output"]>;
  shortTitle?: Maybe<Scalars["String"]["output"]>;
  slug: Scalars["String"]["output"];
  subRules?: Maybe<Array<Maybe<GenericRule>>>;
  text?: Maybe<Array<Maybe<RuleText>>>;
  title: Scalars["String"]["output"];
};

export type Img = {
  __typename?: "Img";
  style?: Maybe<Scalars["String"]["output"]>;
  target: Scalars["String"]["output"];
};

export type Item = {
  __typename?: "Item";
  couldStock: Array<Maybe<ItemShop>>;
  createdBy: User;
  defaultPrice: Scalars["Int"]["output"];
  effects: Array<Maybe<Effect>>;
  heldBy: Array<Maybe<Character>>;
  id: Scalars["ID"]["output"];
  inStock: Scalars["Boolean"]["output"];
  isMagic: Scalars["Boolean"]["output"];
  rarity?: Maybe<Rarity>;
  salePrice?: Maybe<Scalars["Int"]["output"]>;
  slots: Scalars["Int"]["output"];
  tags: Array<Maybe<Scalars["String"]["output"]>>;
  text: Array<Maybe<RuleText>>;
  title: Scalars["String"]["output"];
  uses?: Maybe<Uses>;
};

export type ItemInStockInput = {
  defaultPrice: Scalars["Int"]["input"];
  effects: Array<InputMaybe<EffectInput>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  isMagic: Scalars["Boolean"]["input"];
  rarity?: InputMaybe<Rarity>;
  salePrice?: InputMaybe<Scalars["Int"]["input"]>;
  slots: Scalars["Int"]["input"];
  tags: Array<InputMaybe<Scalars["String"]["input"]>>;
  text: Array<InputMaybe<RuleTextInput>>;
  title: Scalars["String"]["input"];
  uses?: InputMaybe<UsesInput>;
};

export type ItemInput = {
  defaultPrice: Scalars["Int"]["input"];
  effects: Array<InputMaybe<EffectInput>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  isMagic: Scalars["Boolean"]["input"];
  rarity?: InputMaybe<Rarity>;
  slots: Scalars["Int"]["input"];
  tags: Array<InputMaybe<Scalars["String"]["input"]>>;
  text: Array<InputMaybe<RuleTextInput>>;
  title: Scalars["String"]["input"];
  uses?: InputMaybe<UsesInput>;
};

export type ItemShop = {
  __typename?: "ItemShop";
  campaign?: Maybe<Campaign>;
  canEdit: Scalars["Boolean"]["output"];
  createdBy: User;
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  itemsCouldStock: Array<Maybe<Item>>;
  itemsInStock: Array<Maybe<Item>>;
  name: Scalars["String"]["output"];
};

export type ItemShopInput = {
  description: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["ID"]["input"]>;
  itemsCouldStock: Array<InputMaybe<ItemInput>>;
  itemsInStock: Array<InputMaybe<ItemInStockInput>>;
  name: Scalars["String"]["input"];
};

export type Lineage = Rule & {
  __typename?: "Lineage";
  description: Array<Maybe<Scalars["String"]["output"]>>;
  href?: Maybe<Scalars["String"]["output"]>;
  img?: Maybe<Img>;
  shortTitle?: Maybe<Scalars["String"]["output"]>;
  size: Array<Size>;
  slug: Scalars["String"]["output"];
  speeds: Array<Speed>;
  stat?: Maybe<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
  traits: Array<GenericFeature>;
  variants?: Maybe<Array<Maybe<LineageVariant>>>;
};

export type LineageVariant = Rule & {
  __typename?: "LineageVariant";
  description?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  href?: Maybe<Scalars["String"]["output"]>;
  img?: Maybe<Img>;
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
  addCharacterToCampaign: Campaign;
  addShopToCampaign: Campaign;
  createCampaign: Campaign;
  createCharacter?: Maybe<Character>;
  createShop?: Maybe<ItemShop>;
  createUser?: Maybe<AuthPayload>;
  deleteCampaign: Scalars["Boolean"]["output"];
  deleteCharacter?: Maybe<Scalars["Boolean"]["output"]>;
  deleteShop?: Maybe<Scalars["Boolean"]["output"]>;
  forgotPassword?: Maybe<Scalars["Boolean"]["output"]>;
  login?: Maybe<AuthPayload>;
  removeCharacterFromCampaign: Campaign;
  removeShopFromCampaign: Campaign;
  sellItem?: Maybe<ItemShop>;
  setPassword?: Maybe<User>;
  updateCampaign: Campaign;
  updateCharacter?: Maybe<Character>;
  updateMe?: Maybe<AuthPayload>;
  updateShop?: Maybe<ItemShop>;
};

export type MutationaddCharacterToCampaignArgs = {
  campaignId: Scalars["ID"]["input"];
  characterId: Scalars["ID"]["input"];
};

export type MutationaddShopToCampaignArgs = {
  campaignId: Scalars["ID"]["input"];
  shopId: Scalars["ID"]["input"];
};

export type MutationcreateCampaignArgs = {
  input: CampaignInput;
};

export type MutationcreateCharacterArgs = {
  input?: InputMaybe<CharacterInput>;
};

export type MutationcreateShopArgs = {
  input?: InputMaybe<ItemShopInput>;
};

export type MutationcreateUserArgs = {
  email: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  password: Scalars["String"]["input"];
};

export type MutationdeleteCampaignArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationdeleteCharacterArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationdeleteShopArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationforgotPasswordArgs = {
  baseUrl?: InputMaybe<Scalars["String"]["input"]>;
  email: Scalars["String"]["input"];
};

export type MutationloginArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationremoveCharacterFromCampaignArgs = {
  campaignId: Scalars["ID"]["input"];
  characterId: Scalars["ID"]["input"];
};

export type MutationremoveShopFromCampaignArgs = {
  campaignId: Scalars["ID"]["input"];
  shopId: Scalars["ID"]["input"];
};

export type MutationsellItemArgs = {
  characterId: Scalars["ID"]["input"];
  itemId: Scalars["ID"]["input"];
  shopId: Scalars["ID"]["input"];
};

export type MutationsetPasswordArgs = {
  forgotPasswordId: Scalars["String"]["input"];
  newPassword: Scalars["String"]["input"];
};

export type MutationupdateCampaignArgs = {
  characterIds?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id: Scalars["ID"]["input"];
  input: CampaignInput;
  shopIds?: InputMaybe<Array<Scalars["ID"]["input"]>>;
};

export type MutationupdateCharacterArgs = {
  id: Scalars["ID"]["input"];
  input?: InputMaybe<CharacterInput>;
};

export type MutationupdateMeArgs = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationupdateShopArgs = {
  id: Scalars["ID"]["input"];
  input?: InputMaybe<ItemShopInput>;
};

export type MyCampaignsResult = {
  __typename?: "MyCampaignsResult";
  in: Array<Maybe<Campaign>>;
  owned: Array<Maybe<Campaign>>;
};

export type Query = {
  __typename?: "Query";
  allCampaigns: Array<Maybe<Campaign>>;
  allItems?: Maybe<Array<Maybe<Item>>>;
  allShops?: Maybe<Array<Maybe<ItemShop>>>;
  campaign?: Maybe<Campaign>;
  character?: Maybe<Character>;
  characterClasses: Array<Maybe<CharacterClass>>;
  cultures: Array<Maybe<Culture>>;
  genericRules: Array<Maybe<GenericRule>>;
  itemShop?: Maybe<ItemShop>;
  lineages: Array<Maybe<Lineage>>;
  me?: Maybe<User>;
  myCampaigns: MyCampaignsResult;
  rules: Array<Maybe<RuleSection>>;
  searchAll: Array<Maybe<SearchResult>>;
  slugMap?: Maybe<Array<Maybe<SlugDict>>>;
  universalFeatures: Array<Maybe<GenericFeature>>;
  user?: Maybe<User>;
  users: Array<Maybe<User>>;
};

export type QuerycampaignArgs = {
  id: Scalars["ID"]["input"];
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

export type QueryitemShopArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QuerylineagesArgs = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
  version?: InputMaybe<VERSIONS>;
};

export type QueryrulesArgs = {
  ruleSectionsToInclude?: InputMaybe<Array<InputMaybe<RuleSectionNames>>>;
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

export type RuleSection = {
  __typename?: "RuleSection";
  rules: Array<Maybe<GenericRule>>;
  sectionName: Scalars["String"]["output"];
};

export type RuleSectionNames = "GM" | "MONSTERS" | "PLAYER";

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

export type Spell = {
  __typename?: "Spell";
  castingTime?: Maybe<Scalars["String"]["output"]>;
  description: Scalars["String"]["output"];
  duration: Scalars["String"]["output"];
  level: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  range?: Maybe<Scalars["String"]["output"]>;
  type: Array<Maybe<SpellType>>;
};

export type SpellType = "ARCANE" | "DIVINE" | "NATURE";

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
  createdCampaigns?: Maybe<Array<Maybe<Campaign>>>;
  createdItemShops?: Maybe<Array<Maybe<ItemShop>>>;
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

export type VERSIONS = "_1a" | "_1b" | "_2a";

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
      | (Omit<CharacterClass, "damage" | "features" | "variants"> & {
          damage: _RefType["Damage"];
          features: Array<Maybe<_RefType["CharacterClassFeature"]>>;
          variants?: Maybe<Array<Maybe<_RefType["CharacterClassVariant"]>>>;
        } & { __typename: "CharacterClass" })
      | (Omit<CharacterClassVariant, "damage" | "features"> & {
          damage: _RefType["Damage"];
          features: Array<Maybe<_RefType["CharacterClassFeature"]>>;
        } & { __typename: "CharacterClassVariant" })
      | (Omit<Culture, "traits" | "variants"> & {
          traits?: Maybe<Array<_RefType["GenericFeature"]>>;
          variants?: Maybe<Array<Maybe<_RefType["CultureVariant"]>>>;
        } & { __typename: "Culture" })
      | (Omit<CultureVariant, "traits"> & {
          traits?: Maybe<Array<_RefType["GenericFeature"]>>;
        } & { __typename: "CultureVariant" })
      | (GenericRule & { __typename: "GenericRule" })
      | (Omit<Lineage, "traits" | "variants"> & {
          traits: Array<_RefType["GenericFeature"]>;
          variants?: Maybe<Array<Maybe<_RefType["LineageVariant"]>>>;
        } & { __typename: "Lineage" })
      | (Omit<LineageVariant, "traits"> & {
          traits?: Maybe<Array<_RefType["GenericFeature"]>>;
        } & { __typename: "LineageVariant" })
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
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  BeastHealth: ResolverTypeWrapper<BeastHealth>;
  BeastStats: ResolverTypeWrapper<BeastStats>;
  BeastmasterPet: ResolverTypeWrapper<BeastmasterPet>;
  Campaign: ResolverTypeWrapper<
    Omit<Campaign, "characters" | "owner"> & {
      characters: Array<Maybe<ResolversTypes["Character"]>>;
      owner: ResolversTypes["User"];
    }
  >;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  CampaignInput: CampaignInput;
  CampaignStatus: CampaignStatus;
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
  CharacterClass: ResolverTypeWrapper<
    Omit<CharacterClass, "damage" | "features" | "variants"> & {
      damage: ResolversTypes["Damage"];
      features: Array<Maybe<ResolversTypes["CharacterClassFeature"]>>;
      variants?: Maybe<Array<Maybe<ResolversTypes["CharacterClassVariant"]>>>;
    }
  >;
  CharacterClassFeature: ResolverTypeWrapper<
    Omit<CharacterClassFeature, "choices"> & {
      choices?: Maybe<Array<ResolversTypes["FeatureChoices"]>>;
    }
  >;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  CharacterClassVariant: ResolverTypeWrapper<
    Omit<CharacterClassVariant, "damage" | "features"> & {
      damage: ResolversTypes["Damage"];
      features: Array<Maybe<ResolversTypes["CharacterClassFeature"]>>;
    }
  >;
  CharacterExtras: ResolverTypeWrapper<CharacterExtras>;
  CharacterInput: CharacterInput;
  Complexity: Complexity;
  Culture: ResolverTypeWrapper<
    Omit<Culture, "traits" | "variants"> & {
      traits?: Maybe<Array<ResolversTypes["GenericFeature"]>>;
      variants?: Maybe<Array<Maybe<ResolversTypes["CultureVariant"]>>>;
    }
  >;
  CultureVariant: ResolverTypeWrapper<
    Omit<CultureVariant, "traits"> & {
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
  Img: ResolverTypeWrapper<Img>;
  Item: ResolverTypeWrapper<
    Omit<Item, "createdBy" | "heldBy"> & {
      createdBy: ResolversTypes["User"];
      heldBy: Array<Maybe<ResolversTypes["Character"]>>;
    }
  >;
  ItemInStockInput: ItemInStockInput;
  ItemInput: ItemInput;
  ItemShop: ResolverTypeWrapper<
    Omit<ItemShop, "createdBy"> & { createdBy: ResolversTypes["User"] }
  >;
  ItemShopInput: ItemShopInput;
  Lineage: ResolverTypeWrapper<
    Omit<Lineage, "traits" | "variants"> & {
      traits: Array<ResolversTypes["GenericFeature"]>;
      variants?: Maybe<Array<Maybe<ResolversTypes["LineageVariant"]>>>;
    }
  >;
  LineageVariant: ResolverTypeWrapper<
    Omit<LineageVariant, "traits"> & {
      traits?: Maybe<Array<ResolversTypes["GenericFeature"]>>;
    }
  >;
  List: ResolverTypeWrapper<List>;
  Mutation: ResolverTypeWrapper<{}>;
  MyCampaignsResult: ResolverTypeWrapper<MyCampaignsResult>;
  Query: ResolverTypeWrapper<{}>;
  Range: ResolverTypeWrapper<Range>;
  Rarity: Rarity;
  RechargeOn: RechargeOn;
  Rule: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>["Rule"]>;
  RuleSection: ResolverTypeWrapper<RuleSection>;
  RuleSectionNames: RuleSectionNames;
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
  Spell: ResolverTypeWrapper<Spell>;
  SpellType: SpellType;
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
  Int: Scalars["Int"]["output"];
  BeastHealth: BeastHealth;
  BeastStats: BeastStats;
  BeastmasterPet: BeastmasterPet;
  Campaign: Omit<Campaign, "characters" | "owner"> & {
    characters: Array<Maybe<ResolversParentTypes["Character"]>>;
    owner: ResolversParentTypes["User"];
  };
  ID: Scalars["ID"]["output"];
  CampaignInput: CampaignInput;
  Character: Omit<
    Character,
    "characterClass" | "characterCulture" | "characterLineage" | "createdBy"
  > & {
    characterClass: ResolversParentTypes["CharacterClass"];
    characterCulture: ResolversParentTypes["Culture"];
    characterLineage: ResolversParentTypes["Lineage"];
    createdBy: ResolversParentTypes["User"];
  };
  CharacterClass: Omit<CharacterClass, "damage" | "features" | "variants"> & {
    damage: ResolversParentTypes["Damage"];
    features: Array<Maybe<ResolversParentTypes["CharacterClassFeature"]>>;
    variants?: Maybe<
      Array<Maybe<ResolversParentTypes["CharacterClassVariant"]>>
    >;
  };
  CharacterClassFeature: Omit<CharacterClassFeature, "choices"> & {
    choices?: Maybe<Array<ResolversParentTypes["FeatureChoices"]>>;
  };
  Boolean: Scalars["Boolean"]["output"];
  CharacterClassVariant: Omit<CharacterClassVariant, "damage" | "features"> & {
    damage: ResolversParentTypes["Damage"];
    features: Array<Maybe<ResolversParentTypes["CharacterClassFeature"]>>;
  };
  CharacterExtras: CharacterExtras;
  CharacterInput: CharacterInput;
  Culture: Omit<Culture, "traits" | "variants"> & {
    traits?: Maybe<Array<ResolversParentTypes["GenericFeature"]>>;
    variants?: Maybe<Array<Maybe<ResolversParentTypes["CultureVariant"]>>>;
  };
  CultureVariant: Omit<CultureVariant, "traits"> & {
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
  Img: Img;
  Item: Omit<Item, "createdBy" | "heldBy"> & {
    createdBy: ResolversParentTypes["User"];
    heldBy: Array<Maybe<ResolversParentTypes["Character"]>>;
  };
  ItemInStockInput: ItemInStockInput;
  ItemInput: ItemInput;
  ItemShop: Omit<ItemShop, "createdBy"> & {
    createdBy: ResolversParentTypes["User"];
  };
  ItemShopInput: ItemShopInput;
  Lineage: Omit<Lineage, "traits" | "variants"> & {
    traits: Array<ResolversParentTypes["GenericFeature"]>;
    variants?: Maybe<Array<Maybe<ResolversParentTypes["LineageVariant"]>>>;
  };
  LineageVariant: Omit<LineageVariant, "traits"> & {
    traits?: Maybe<Array<ResolversParentTypes["GenericFeature"]>>;
  };
  List: List;
  Mutation: {};
  MyCampaignsResult: MyCampaignsResult;
  Query: {};
  Range: Range;
  Rule: ResolversInterfaceTypes<ResolversParentTypes>["Rule"];
  RuleSection: RuleSection;
  RuleText: RuleText;
  RuleTextInput: RuleTextInput;
  SearchResult: SearchResult;
  ShifterForm: Omit<ShifterForm, "damage"> & {
    damage: Array<Maybe<ResolversParentTypes["Damage"]>>;
  };
  SlugDict: SlugDict;
  Speed: Speed;
  Spell: Spell;
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
  armor?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
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

export type CampaignResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Campaign"] = ResolversParentTypes["Campaign"],
> = {
  characters?: Resolver<
    Array<Maybe<ResolversTypes["Character"]>>,
    ParentType,
    ContextType
  >;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  shops?: Resolver<
    Array<Maybe<ResolversTypes["ItemShop"]>>,
    ParentType,
    ContextType
  >;
  startDate?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  status?: Resolver<ResolversTypes["CampaignStatus"], ParentType, ContextType>;
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
  campaign?: Resolver<
    Maybe<ResolversTypes["Campaign"]>,
    ParentType,
    ContextType
  >;
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
  maxSlots?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  maxStamina?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  mettle?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  rangeMax?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  rangeMin?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  shieldName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  slots?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  spells?: Resolver<
    Array<Maybe<ResolversTypes["Spell"]>>,
    ParentType,
    ContextType
  >;
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
  img?: Resolver<Maybe<ResolversTypes["Img"]>, ParentType, ContextType>;
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
  variants?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["CharacterClassVariant"]>>>,
    ParentType,
    ContextType
  >;
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
  img?: Resolver<Maybe<ResolversTypes["Img"]>, ParentType, ContextType>;
  isVariant?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
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

export type CharacterClassVariantResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CharacterClassVariant"] = ResolversParentTypes["CharacterClassVariant"],
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
  img?: Resolver<Maybe<ResolversTypes["Img"]>, ParentType, ContextType>;
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
  img?: Resolver<Maybe<ResolversTypes["Img"]>, ParentType, ContextType>;
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
  variants?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["CultureVariant"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CultureVariantResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CultureVariant"] = ResolversParentTypes["CultureVariant"],
> = {
  description?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  href?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  img?: Resolver<Maybe<ResolversTypes["Img"]>, ParentType, ContextType>;
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
  img?: Resolver<Maybe<ResolversTypes["Img"]>, ParentType, ContextType>;
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
  img?: Resolver<Maybe<ResolversTypes["Img"]>, ParentType, ContextType>;
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
  img?: Resolver<Maybe<ResolversTypes["Img"]>, ParentType, ContextType>;
  isVariant?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
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
  img?: Resolver<Maybe<ResolversTypes["Img"]>, ParentType, ContextType>;
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

export type ImgResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Img"] = ResolversParentTypes["Img"],
> = {
  style?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  target?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Item"] = ResolversParentTypes["Item"],
> = {
  couldStock?: Resolver<
    Array<Maybe<ResolversTypes["ItemShop"]>>,
    ParentType,
    ContextType
  >;
  createdBy?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  defaultPrice?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  effects?: Resolver<
    Array<Maybe<ResolversTypes["Effect"]>>,
    ParentType,
    ContextType
  >;
  heldBy?: Resolver<
    Array<Maybe<ResolversTypes["Character"]>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  inStock?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  isMagic?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  rarity?: Resolver<Maybe<ResolversTypes["Rarity"]>, ParentType, ContextType>;
  salePrice?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  slots?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  tags?: Resolver<
    Array<Maybe<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  text?: Resolver<
    Array<Maybe<ResolversTypes["RuleText"]>>,
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  uses?: Resolver<Maybe<ResolversTypes["Uses"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemShopResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ItemShop"] = ResolversParentTypes["ItemShop"],
> = {
  campaign?: Resolver<
    Maybe<ResolversTypes["Campaign"]>,
    ParentType,
    ContextType
  >;
  canEdit?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  itemsCouldStock?: Resolver<
    Array<Maybe<ResolversTypes["Item"]>>,
    ParentType,
    ContextType
  >;
  itemsInStock?: Resolver<
    Array<Maybe<ResolversTypes["Item"]>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LineageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Lineage"] = ResolversParentTypes["Lineage"],
> = {
  description?: Resolver<
    Array<Maybe<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  href?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  img?: Resolver<Maybe<ResolversTypes["Img"]>, ParentType, ContextType>;
  shortTitle?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  size?: Resolver<Array<ResolversTypes["Size"]>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  speeds?: Resolver<Array<ResolversTypes["Speed"]>, ParentType, ContextType>;
  stat?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  traits?: Resolver<
    Array<ResolversTypes["GenericFeature"]>,
    ParentType,
    ContextType
  >;
  variants?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["LineageVariant"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LineageVariantResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["LineageVariant"] = ResolversParentTypes["LineageVariant"],
> = {
  description?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  href?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  img?: Resolver<Maybe<ResolversTypes["Img"]>, ParentType, ContextType>;
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
  addCharacterToCampaign?: Resolver<
    ResolversTypes["Campaign"],
    ParentType,
    ContextType,
    RequireFields<
      MutationaddCharacterToCampaignArgs,
      "campaignId" | "characterId"
    >
  >;
  addShopToCampaign?: Resolver<
    ResolversTypes["Campaign"],
    ParentType,
    ContextType,
    RequireFields<MutationaddShopToCampaignArgs, "campaignId" | "shopId">
  >;
  createCampaign?: Resolver<
    ResolversTypes["Campaign"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateCampaignArgs, "input">
  >;
  createCharacter?: Resolver<
    Maybe<ResolversTypes["Character"]>,
    ParentType,
    ContextType,
    Partial<MutationcreateCharacterArgs>
  >;
  createShop?: Resolver<
    Maybe<ResolversTypes["ItemShop"]>,
    ParentType,
    ContextType,
    Partial<MutationcreateShopArgs>
  >;
  createUser?: Resolver<
    Maybe<ResolversTypes["AuthPayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationcreateUserArgs, "email" | "password">
  >;
  deleteCampaign?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationdeleteCampaignArgs, "id">
  >;
  deleteCharacter?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationdeleteCharacterArgs, "id">
  >;
  deleteShop?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationdeleteShopArgs, "id">
  >;
  forgotPassword?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationforgotPasswordArgs, "email">
  >;
  login?: Resolver<
    Maybe<ResolversTypes["AuthPayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationloginArgs, "email" | "password">
  >;
  removeCharacterFromCampaign?: Resolver<
    ResolversTypes["Campaign"],
    ParentType,
    ContextType,
    RequireFields<
      MutationremoveCharacterFromCampaignArgs,
      "campaignId" | "characterId"
    >
  >;
  removeShopFromCampaign?: Resolver<
    ResolversTypes["Campaign"],
    ParentType,
    ContextType,
    RequireFields<MutationremoveShopFromCampaignArgs, "campaignId" | "shopId">
  >;
  sellItem?: Resolver<
    Maybe<ResolversTypes["ItemShop"]>,
    ParentType,
    ContextType,
    RequireFields<MutationsellItemArgs, "characterId" | "itemId" | "shopId">
  >;
  setPassword?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationsetPasswordArgs, "forgotPasswordId" | "newPassword">
  >;
  updateCampaign?: Resolver<
    ResolversTypes["Campaign"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateCampaignArgs, "id" | "input">
  >;
  updateCharacter?: Resolver<
    Maybe<ResolversTypes["Character"]>,
    ParentType,
    ContextType,
    RequireFields<MutationupdateCharacterArgs, "id">
  >;
  updateMe?: Resolver<
    Maybe<ResolversTypes["AuthPayload"]>,
    ParentType,
    ContextType,
    Partial<MutationupdateMeArgs>
  >;
  updateShop?: Resolver<
    Maybe<ResolversTypes["ItemShop"]>,
    ParentType,
    ContextType,
    RequireFields<MutationupdateShopArgs, "id">
  >;
};

export type MyCampaignsResultResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MyCampaignsResult"] = ResolversParentTypes["MyCampaignsResult"],
> = {
  in?: Resolver<
    Array<Maybe<ResolversTypes["Campaign"]>>,
    ParentType,
    ContextType
  >;
  owned?: Resolver<
    Array<Maybe<ResolversTypes["Campaign"]>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  allCampaigns?: Resolver<
    Array<Maybe<ResolversTypes["Campaign"]>>,
    ParentType,
    ContextType
  >;
  allItems?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Item"]>>>,
    ParentType,
    ContextType
  >;
  allShops?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ItemShop"]>>>,
    ParentType,
    ContextType
  >;
  campaign?: Resolver<
    Maybe<ResolversTypes["Campaign"]>,
    ParentType,
    ContextType,
    RequireFields<QuerycampaignArgs, "id">
  >;
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
  itemShop?: Resolver<
    Maybe<ResolversTypes["ItemShop"]>,
    ParentType,
    ContextType,
    Partial<QueryitemShopArgs>
  >;
  lineages?: Resolver<
    Array<Maybe<ResolversTypes["Lineage"]>>,
    ParentType,
    ContextType,
    Partial<QuerylineagesArgs>
  >;
  me?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  myCampaigns?: Resolver<
    ResolversTypes["MyCampaignsResult"],
    ParentType,
    ContextType
  >;
  rules?: Resolver<
    Array<Maybe<ResolversTypes["RuleSection"]>>,
    ParentType,
    ContextType,
    Partial<QueryrulesArgs>
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
    | "CharacterClassVariant"
    | "Culture"
    | "CultureVariant"
    | "GenericRule"
    | "Lineage"
    | "LineageVariant"
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

export type RuleSectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RuleSection"] = ResolversParentTypes["RuleSection"],
> = {
  rules?: Resolver<
    Array<Maybe<ResolversTypes["GenericRule"]>>,
    ParentType,
    ContextType
  >;
  sectionName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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

export type SpellResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Spell"] = ResolversParentTypes["Spell"],
> = {
  castingTime?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  level?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  range?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<
    Array<Maybe<ResolversTypes["SpellType"]>>,
    ParentType,
    ContextType
  >;
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
  createdCampaigns?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Campaign"]>>>,
    ParentType,
    ContextType
  >;
  createdItemShops?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ItemShop"]>>>,
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
  Campaign?: CampaignResolvers<ContextType>;
  Character?: CharacterResolvers<ContextType>;
  CharacterClass?: CharacterClassResolvers<ContextType>;
  CharacterClassFeature?: CharacterClassFeatureResolvers<ContextType>;
  CharacterClassVariant?: CharacterClassVariantResolvers<ContextType>;
  CharacterExtras?: CharacterExtrasResolvers<ContextType>;
  Culture?: CultureResolvers<ContextType>;
  CultureVariant?: CultureVariantResolvers<ContextType>;
  Damage?: DamageResolvers<ContextType>;
  Deflect?: DeflectResolvers<ContextType>;
  Effect?: EffectResolvers<ContextType>;
  Feature?: FeatureResolvers<ContextType>;
  FeatureChoices?: FeatureChoicesResolvers<ContextType>;
  FeatureWithoutChoices?: FeatureWithoutChoicesResolvers<ContextType>;
  GenericFeature?: GenericFeatureResolvers<ContextType>;
  GenericRule?: GenericRuleResolvers<ContextType>;
  Img?: ImgResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  ItemShop?: ItemShopResolvers<ContextType>;
  Lineage?: LineageResolvers<ContextType>;
  LineageVariant?: LineageVariantResolvers<ContextType>;
  List?: ListResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MyCampaignsResult?: MyCampaignsResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Range?: RangeResolvers<ContextType>;
  Rule?: RuleResolvers<ContextType>;
  RuleSection?: RuleSectionResolvers<ContextType>;
  RuleText?: RuleTextResolvers<ContextType>;
  SearchResult?: SearchResultResolvers<ContextType>;
  ShifterForm?: ShifterFormResolvers<ContextType>;
  SlugDict?: SlugDictResolvers<ContextType>;
  Speed?: SpeedResolvers<ContextType>;
  Spell?: SpellResolvers<ContextType>;
  Training?: TrainingResolvers<ContextType>;
  TrainingOptions?: TrainingOptionsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Uses?: UsesResolvers<ContextType>;
  Weapons?: WeaponsResolvers<ContextType>;
  shifterArmor?: shifterArmorResolvers<ContextType>;
  shifterFeature?: shifterFeatureResolvers<ContextType>;
};
