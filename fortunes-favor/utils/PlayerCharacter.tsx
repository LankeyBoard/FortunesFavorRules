import { LANGUAGES, action_type, rule_type, stat_options } from "./enums";
import CharacterClassData from "./CharacterClass";
import CharacterCulture from "./CharacterCulture";
import CharacterFeatureData from "./CharacterFeature";
import CharacterLineage from "./CharacterLineage";
import GenericFeatureData from "./GenericFeatureData";
import { FeatureChoices, GenericFeature, RuleText } from "./graphQLtypes";
import CharacterClass from "./CharacterClass";

type Stats = {
  mettle: number;
  agility: number;
  heart: number;
  intellect: number;
};

type Effect = {
  target: string;
  calculation: (args: any) => string | number;
};

enum Rarity {
  common = "Common",
  uncommon = "Uncommon",
  rare = "Rare",
  legendary = "Legendary",
  unique = "Unique",
}

const downgradeBaseDamage = (damage: {
  dice: number;
  count: number;
  stat: number;
}) => {
  let updatedDamage = { ...damage };
  if (damage.dice === 6 && damage.count > 1) {
    updatedDamage.dice = 12;
    updatedDamage.count -= 1;
  } else {
    if (damage.dice > 4) {
      updatedDamage.dice -= 2;
    }
  }
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

export class PlayerCharacterFeature extends GenericFeatureData {
  readonly source: string;
  readonly effects: Effect[];
  private _chosen: string[];
  private _level: number;
  constructor(
    title: string,
    source: string,
    effects: Effect[],
    slug: string,
    ruleType: rule_type,
    text: RuleText[],
    multiSelect: boolean,
    choices: FeatureChoices[],
    chosen: string[],
    chooseNum: number,
    shortText?: string | undefined,
    level?: number,
  ) {
    super(
      title,
      slug,
      ruleType,
      text,
      multiSelect,
      choices,
      chooseNum,
      shortText,
    );
    this.source = source;
    this.effects = effects;
    this._chosen = chosen;
    this._level = level || 0;
  }
  public get chosen() {
    return this._chosen;
  }
  public set chosen(c: string[]) {
    this._chosen = c;
  }
  public get level() {
    return this._level;
  }
  public addChoice(choice: string) {
    if (this.chosen.includes(choice)) return;
    if (this.chosen.length < this.chooseNum) this.chosen.push(choice);
    else this.chosen = [...this._chosen.slice(1), choice];
  }
  public removeChoice(choice: string) {
    const i = this._chosen.indexOf(choice);
    if (i !== -1) this._chosen.splice(i, 1);
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
    rarity: Rarity,
  ) {
    super(title, text, effects);
    this.isMagicItem = isMagicItem;
    this.rarity = rarity;
  }
}

const updateFeatures = (
  sourceType: string,
  source: CharacterCulture | CharacterClassData | CharacterLineage,
  currentCharacter: PlayerCharacter,
) => {
  // Remove actions from old source
  const updatedActions: PlayerCharacterFeature[] | undefined = [];
  currentCharacter.actions?.forEach((action) => {
    if (action.source !== sourceType) {
      updatedActions.push(action);
    }
  });
  const updatedCounters: PlayerCharacterFeature[] | undefined = [];
  currentCharacter.counters?.forEach((action) => {
    if (action.source !== sourceType) {
      updatedCounters.push(action);
    }
  });
  const updatedFeatures: PlayerCharacterFeature[] = [];
  currentCharacter.features?.forEach((feature) => {
    if (feature.source !== sourceType) {
      updatedFeatures.push(feature);
    }
  });
  source.features.forEach((feature) => {
    if (feature instanceof CharacterFeatureData) {
      if (feature.level <= currentCharacter.level) {
        if (feature.actionType === action_type.action) {
          updatedActions.push(
            new PlayerCharacterFeature(
              feature.title,
              sourceType,
              [],
              feature.slug,
              rule_type.Rule,
              feature.text,
              feature.multiSelect,
              feature.choices,
              [],
              feature.chooseNum,
              feature.shortText,
              feature.level,
            ),
          );
        } else if (feature.actionType === action_type.counter) {
          updatedActions.push(
            new PlayerCharacterFeature(
              feature.title,
              sourceType,
              [],
              feature.slug,
              rule_type.Rule,
              feature.text,
              feature.multiSelect,
              feature.choices,
              [],
              feature.chooseNum,
              feature.shortText,
              feature.level,
            ),
          );
        } else {
          updatedFeatures.push(
            new PlayerCharacterFeature(
              feature.title,
              sourceType,
              [],
              feature.slug,
              rule_type.Rule,
              feature.text,
              feature.multiSelect,
              feature.choices,
              [],
              feature.chooseNum,
              feature.shortText,
              feature.level,
            ),
          );
        }
      }
    } else {
      updatedFeatures.push(
        new PlayerCharacterFeature(
          feature.title,
          sourceType,
          [],
          feature.slug,
          rule_type.Rule,
          feature.text,
          feature.multiSelect,
          feature.choices,
          [],
          feature.chooseNum,
        ),
      );
    }
  });

  return {
    features: updatedFeatures,
    actions: updatedActions,
    counters: updatedCounters,
  };
};

export default class PlayerCharacter {
  name?: string;
  player_name?: string;
  private _level: number;
  private _characterClass?: CharacterClass;
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
  private _actions?: PlayerCharacterFeature[];
  private _counters?: PlayerCharacterFeature[];
  private _features?: PlayerCharacterFeature[];
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
          this.characterClass?.slug === "BRAWLER" &&
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
    startingCharacter?: PlayerCharacter,
  ) {
    if (startingCharacter) {
      this._level = startingCharacter.level;
      this._stats = startingCharacter.stats;
      this.coin = startingCharacter.coin;
      this._languages = startingCharacter.languages;
      this._characterClass = startingCharacter.characterClass;
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
      this._range = startingCharacter.characterClass?.range;
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
  }

  public get level(): number {
    return this._level;
  }
  public set level(newLevel: number) {
    if (this.characterClass) {
      if (newLevel > this.level) {
        this.characterClass?.features.forEach((feature) => {
          if (feature.level > this.level && feature.level <= newLevel) {
            this.features?.push(
              new PlayerCharacterFeature(
                feature.title,
                "class",
                [],
                feature.slug,
                rule_type.Rule,
                feature.text,
                feature.multiSelect,
                feature.choices,
                [],
                feature.chooseNum,
                feature.shortText,
                feature.level,
              ),
            );
          }
        });
      } else if (newLevel < this.level) {
        const updatedFeatures: GenericFeature[] = [];
        for (const feature of this.characterClass?.features) {
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
  public get characterClass(): CharacterClassData {
    if (!this._characterClass)
      throw new Error("Character class must be set before accessing");
    return this._characterClass;
  }

  public set characterClass(characterClass: CharacterClassData) {
    this._characterClass = characterClass;
    const updatedFeatures = updateFeatures("class", characterClass, this);
    this._actions = updatedFeatures.actions;
    this._counters = updatedFeatures.counters;
    this._features = updatedFeatures.features;
    this._range = characterClass.range;
  }
  public get culture(): CharacterCulture {
    if (!this._characterCulture)
      throw new Error("Culture must be set before accessing");
    return this._characterCulture;
  }
  public set culture(characterCulture: CharacterCulture) {
    this._characterCulture = characterCulture;

    const updatedFeatures = updateFeatures("culture", characterCulture, this);
    this._actions = updatedFeatures.actions;
    this._counters = updatedFeatures.counters;
    this._features = updatedFeatures.features;
  }
  public get lineage(): CharacterLineage {
    if (!this._characterLineage)
      throw new Error("Lineage must be set before accessing");
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

  public get deflect() {
    if (!this.characterClass)
      throw new Error("Deflect cannot be calculated without a class");
    return this.characterClass?.deflect;
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
  public get counter(): number {
    return this._armorValue() - 5;
  }
  public get baseDamage() {
    if (!this.characterClass)
      throw new Error("Base damage cannot be calculated without a class");

    let statDmg = Number.MIN_SAFE_INTEGER;
    this.characterClass?.damage.stat.forEach((stat) => {
      switch (stat) {
        case stat_options.mettle:
          statDmg = Math.max(statDmg, this.stats.mettle);
          break;
        case stat_options.agility:
          statDmg = Math.max(statDmg, this.stats.agility);
          break;
        case stat_options.heart:
          statDmg = Math.max(statDmg, this.stats.heart);
          break;
        case stat_options.int:
          statDmg = Math.max(statDmg, this.stats.intellect);
          break;
      }
    });
    const baseDmg = { ...this.characterClass?.damage, stat: statDmg };

    if (this.shieldName && this.shieldName != "None") {
      if (this._characterClass) return downgradeBaseDamage(baseDmg);
    }
    return baseDmg;
  }
  public get range() {
    if (!this.characterClass || !this._range)
      throw new Error("Range cannot be calculated without a class or range");

    if (
      this.characterClass.slug === "BRAWLER" &&
      this.stats.agility > this.stats.mettle
    ) {
      let tempRange = { ...this._range };
      tempRange.max = this._range.max * 2;
      return tempRange;
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
  public get attack() {
    let attack = Number.MIN_SAFE_INTEGER;
    this.characterClass?.attackStat.forEach((stat) => {
      switch (stat) {
        case stat_options.mettle:
          attack = Math.max(attack, this.stats.mettle);
          break;
        case stat_options.agility:
          attack = Math.max(attack, this.stats.agility);
          break;
        case stat_options.heart:
          attack = Math.max(attack, this.stats.heart);
          break;
        case stat_options.int:
          attack = Math.max(attack, this.stats.intellect);
          break;
      }
    });
    return attack;
  }
}
