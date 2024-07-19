import { LANGUAGES, action_type, rule_type, stat_options } from "../enums";
import CharacterClassData from "./CharacterClass";
import CharacterCulture from "./CharacterCulture";
import CharacterFeatureData from "./CharacterFeature";
import CharacterLineage from "./CharacterLineage";
import GenericFeatureData from "./GenericFeatureData";
import { FeatureChoices, GenericFeature, RuleText } from "./graphQLtypes";

type Stats = {
  mettle: number;
  agility: number;
  heart: number;
  intellect: number;
};

type Effect = {
  target: string;
  type: EffectTypes;
  calculation: (args: any) => string | number;
};

enum EffectTypes {
  add = "ADD",
  replace = "REPLACE",
}

enum Rarity {
  common = "Common",
  uncommon = "Uncommon",
  rare = "Rare",
  ultraRare = "Ultra Rare",
  legendary = "Legendary",
  unique = "Unique",
}

const downgradeBaseDamage = (damage: {
  dice: number;
  count: number;
  stat: stat_options;
}) => {
  console.log("initial damage", damage);
  let updatedDamage = { ...damage };
  if (damage.dice === 6 && damage.count > 1) {
    updatedDamage.dice = 12;
    updatedDamage.count -= 1;
  } else {
    if (damage.dice > 4) {
      updatedDamage.dice -= 2;
    }
  }
  console.log("downgraded damage", updatedDamage);
  return updatedDamage;
};
class Input {
  readonly title: string;
  readonly text: RuleText[];

  constructor(title: string, text: [RuleText]) {
    this.title = title;
    this.text = text;
  }
}

class Feature extends Input {
  readonly effects?: Effect[];

  constructor(title: string, text: [RuleText], effects: Effect[]) {
    super(title, text);
    this.effects = effects;
  }
}

class CharacterFeature extends GenericFeatureData {
  readonly source: Object;
  readonly effects: Effect[];
  constructor(
    title: string,
    source: Object,
    effects: Effect[],
    slug: string,
    ruleType: rule_type,
    text: RuleText[],
    multiSelect: boolean,
    choices: FeatureChoices[],
    shortText?: string | undefined
  ) {
    super(title, slug, ruleType, text, multiSelect, choices, shortText);
    this.source = source;
    this.effects = effects;
  }
}

class Item extends Feature {
  readonly isMagicItem: boolean;
  readonly rarity: Rarity;
  constructor(
    title: string,
    text: [RuleText],
    effects: Effect[],
    isMagicItem: boolean,
    rarity: Rarity
  ) {
    super(title, text, effects);
    this.isMagicItem = isMagicItem;
    this.rarity = rarity;
  }
}

const updateFeatures = (
  sourceType: string,
  source: CharacterCulture | CharacterClassData | CharacterLineage,
  currentCharacter: PlayerCharacter
) => {
  // Remove actions from old source
  const updatedActions: CharacterFeature[] | undefined = [];
  currentCharacter.actions?.forEach((action) => {
    if (action.source !== sourceType) {
      updatedActions.push(action);
    }
  });
  const updatedCounters: CharacterFeature[] | undefined = [];
  currentCharacter.counters?.forEach((action) => {
    if (action.source !== sourceType) {
      updatedCounters.push(action);
    }
  });
  const updatedFeatures: CharacterFeature[] = [];
  currentCharacter.features?.forEach((feature) => {
    if (feature.source !== sourceType) {
      updatedFeatures.push(feature);
    }
  });
  source.features.forEach((feature) => {
    console.log("feature updates", feature);
    if (feature instanceof CharacterFeatureData) {
      if (feature.level <= currentCharacter.level) {
        if (feature.actionType === action_type.action) {
          updatedActions.push({
            ...feature,
            source: sourceType,
            text: feature.text,
            ruleType: rule_type.Rule,
            effects: [],
          });
        } else if (feature.actionType === action_type.counter) {
          updatedActions.push({
            ...feature,
            source: sourceType,
            text: feature.text,
            effects: [],
          });
        } else {
          updatedFeatures.push({
            ...feature,
            source: sourceType,
            text: feature.text,
            effects: [],
          });
        }
      }
    } else {
      updatedFeatures.push({
        ...feature,
        source: sourceType,
        text: feature.text,
        effects: [],
        multiSelect: feature.multiSelect,
        choices: feature.choices,
      });
    }
  });

  return {
    features: updatedFeatures,
    actions: updatedActions,
    counters: updatedCounters,
  };
};

export default class PlayerCharacter {
  character_name?: string;
  player_name?: string;
  private _level: number;
  private _characterClass?: CharacterClassData;
  private _characterCulture?: CharacterCulture;
  private _stats: Stats;
  private _characterLineage?: CharacterLineage;
  private _speeds: { type: string; speed: number; source: string }[];
  coin?: number;
  private _currentHealth?: number;
  private _maxHealth: number;
  private _maxStamina: number;
  private _currentStamina?: number;
  private _armorName: string;
  private _shieldName: string;
  private _counter: number;
  private _baseDamage?: number;
  private _range?: { min: number; max: number };
  private _items?: Item[];
  private _actions?: CharacterFeature[];
  private _counters?: CharacterFeature[];
  private _features?: CharacterFeature[];
  private _languages?: LANGUAGES[];

  private _armorValue = () => {
    let armor = 10 + this.stats.agility;
    switch (this._armorName.toLowerCase()) {
      case "light":
        armor = 12 + this.stats.agility;
        break;
      case "medium":
        armor = 14 + Math.min(this.stats.agility, 2);
        break;
      case "heavy":
        armor = 17;
        break;
      case "none":
        if (
          this.class?.slug === "BRAWLER" &&
          this.armorName.toLowerCase() === "none"
        ) {
          armor = 10 + this.stats.mettle + Math.min(this.stats.agility, 2);
        }
        break;
    }
    switch (this._shieldName.toLowerCase()) {
      case "light":
        if (this.stats.agility >= 3) {
          armor += 1;
        }
        break;
      case "medium":
        if (this.stats.agility >= 1 && this.stats.mettle >= 1) {
          armor += 2;
        }
        break;
      case "heavy":
        if (this.stats.mettle >= 3) {
          armor += 2;
        }
        break;
    }
    return armor;
  };

  constructor(
    culture?: CharacterCulture,
    lineage?: CharacterLineage,
    characterClass?: CharacterClassData,
    startingCharacter?: PlayerCharacter
  ) {
    if (startingCharacter) {
      this._level = startingCharacter.level;
      this._stats = startingCharacter.stats;
      this.coin = startingCharacter.coin;
      this._languages = startingCharacter.languages;
      this._characterClass = startingCharacter.class;
      this._characterLineage = startingCharacter.lineage;
      this._characterCulture = startingCharacter.culture;
      this.currentHealth = startingCharacter.currentHealth;
      this.currentStamina = startingCharacter.currentStamina;
      this._maxHealth = startingCharacter.maxHealth;
      this._maxStamina = startingCharacter.maxStamina;
      this._speeds = startingCharacter.speeds;
      this._armorName = startingCharacter.armorName;
      this._shieldName = startingCharacter.shieldName;
      this._counter = startingCharacter.counter || this._armorValue() - 5;
      this._range = startingCharacter.class?.range;
      this._items = startingCharacter.items;
      this._actions = startingCharacter.actions;
      this._counters = startingCharacter.counters;
      this._features = startingCharacter.features;
    } else {
      this._level = 1;
      this._stats = { mettle: 0, agility: 0, heart: 0, intellect: 0 };
      this.coin = 5;
      this._languages = [LANGUAGES.allspeak];
      this._characterClass = characterClass;
      this._characterLineage = lineage;
      this._characterCulture = culture;
      this.currentHealth = 0;
      this.currentStamina = 0;
      this._maxHealth = 0;
      this._maxStamina = 0;
      this._speeds = [{ type: "ground", speed: 30, source: "lineage" }];
      this._armorName = "None";
      this._shieldName = "None";
      this._counter = this._armorValue() - 5;
      this._baseDamage = 0;
      this._range = { min: 0, max: 0 };
      this._items = [];
      this._actions = [];
      this._counters = [];
      this._features = [];
    }
    console.log("playerCharacer features", this._features);
  }

  public get level(): number {
    return this._level;
  }
  public set level(newLevel: number) {
    if (this.class) {
      if (newLevel > this.level) {
        this.class?.features.forEach((feature) => {
          if (feature.level > this.level && feature.level <= newLevel) {
            this.features?.push({
              ...feature,
              source: "class",
              text: feature.text,
              effects: [],
            });
          }
        });
      } else if (newLevel < this.level) {
        const updatedFeatures: GenericFeature[] = [];
        for (const feature of this.class?.features) {
          if (feature.level <= newLevel) {
            updatedFeatures.push(feature);
          } else {
            break;
          }
        }
      }
    }
    this._level = newLevel;
  }
  public get class(): CharacterClassData | undefined {
    return this._characterClass;
  }

  public set class(characterClass: CharacterClassData) {
    this._characterClass = characterClass;
    const updatedFeatures = updateFeatures("class", characterClass, this);
    this._actions = updatedFeatures.actions;
    this._counters = updatedFeatures.counters;
    this._features = updatedFeatures.features;
    this._range = characterClass.range;
  }
  public get culture(): CharacterCulture | undefined {
    return this._characterCulture;
  }
  public set culture(characterCulture: CharacterCulture) {
    this._characterCulture = characterCulture;

    const updatedFeatures = updateFeatures("culture", characterCulture, this);
    this._actions = updatedFeatures.actions;
    this._counters = updatedFeatures.counters;
    this._features = updatedFeatures.features;
  }
  public get lineage(): CharacterLineage | undefined {
    return this._characterLineage;
  }
  public set lineage(characterLineage: CharacterLineage) {
    this._characterLineage = characterLineage;

    const updatedFeatures = updateFeatures("lineage", characterLineage, this);
    this._actions = updatedFeatures.actions;
    this._counters = updatedFeatures.counters;
    this._features = updatedFeatures.features;
    this._speeds = characterLineage.speeds;
  }
  public get stats(): Stats {
    return this._stats;
  }
  public set stats(stats: Stats) {
    this._stats = stats;
  }
  public get currentStamina(): number {
    return this._currentStamina || 0;
  }
  public set currentStamina(stamina: number) {
    this._currentStamina = stamina;
  }
  public get currentHealth(): number {
    return this._currentHealth || 0;
  }
  public set currentHealth(health: number) {
    this._currentHealth = health;
  }

  public get armorName(): string {
    return this._armorName;
  }
  public set armorName(name: string) {
    this._armorName = name;
  }
  public get shieldName(): string {
    return this._shieldName;
  }
  public set shieldName(name: string) {
    this._shieldName = name;
  }

  // Dirived Values
  public get armor(): number {
    return this._armorValue();
  }
  public get speeds() {
    if (this.lineage?.slug === "FAERY") {
      return [
        ...this._speeds,
        { type: "flying", speed: 20, source: "lineage" },
      ];
    }
    return this._speeds;
  }

  public get maxHealth() {
    if (this._characterClass && this._level)
      return (
        this._characterClass?.health +
        (this._level - 1) * this._characterClass?.healthOnLevel
      );
    else return 0;
  }

  public get maxStamina(): number {
    let staminaStat = 0;
    if (this._stats && this._characterClass && this._level) {
      switch (this._characterClass?.staminaStat.toLowerCase()) {
        case stat_options.mettle.toLowerCase():
          staminaStat = this._stats.mettle;
          break;
        case stat_options.agility.toLowerCase():
          staminaStat = this._stats.agility;
          break;
        case stat_options.heart.toLowerCase():
          staminaStat = this._stats.heart;
          break;
        case stat_options.int.toLowerCase():
          staminaStat = this._stats.intellect;
          break;
      }
      this._maxStamina =
        this._characterClass?.stamina +
        (this._level - 1) * this._characterClass?.staminaOnLevel +
        this._level * staminaStat;
      return this._characterClass
        ? this._characterClass?.stamina +
            (this._level - 1) * this._characterClass?.staminaOnLevel +
            this._level * staminaStat
        : 0;
    }
    return 0;
  }
  public get counter(): number | undefined {
    return this._armorValue() - 5;
  }
  public get baseDamage() {
    if (this.shieldName && this.shieldName != "None") {
      if (this._characterClass)
        return downgradeBaseDamage(this._characterClass?.damage);
    }
    return this._characterClass?.damage;
  }
  public get range() {
    if (this.class && this._range) {
      if (
        this.class.slug === "BRAWLER" &&
        this.stats.agility > this.stats.mettle
      ) {
        let tempRange = { ...this._range };
        tempRange.max = this._range.max * 2;
        return tempRange;
      }
    }
    return this._range;
  }
  public get items() {
    return this._items;
  }
  public get actions() {
    return this._actions;
  }
  public get counters() {
    return this._counters;
  }
  public get features() {
    return this._features;
  }
  public get languages() {
    return this._languages;
  }
}
