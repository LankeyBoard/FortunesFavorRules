import { Languages, ActionType, RuleType, StatOptions } from "./enums";
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

enum ItemRarity {
  COMMON = "Common",
  UNCOMMON = "Uncommon",
  RARE = "Rare",
  LEGENDARY = "Legendary",
  UNIQUE = "Unique",
}

export enum FeatureSource {
  CLASS = "class",
  CULTURE = "culture",
  LINEAGE = "lineage",
  NOVICE_FEATURE = "noviceFeature",
  VETERAN_FEATURE = "veteranFeature",
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
  readonly source: FeatureSource;
  readonly effects: Effect[];
  private _chosen: string[];
  private _level: number;
  constructor(
    title: string,
    source: FeatureSource,
    effects: Effect[],
    slug: string,
    ruleType: RuleType,
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
    this._level = level || -1;
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
  readonly rarity: ItemRarity;
  constructor(
    title: string,
    text: [RuleText],
    effects: Effect[],
    isMagicItem: boolean,
    rarity: ItemRarity,
  ) {
    super(title, text, effects);
    this.isMagicItem = isMagicItem;
    this.rarity = rarity;
  }
}

const updateFeatures = (
  sourceType: FeatureSource,
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
        if (feature.actionType === ActionType.ACTION) {
          updatedActions.push(
            new PlayerCharacterFeature(
              feature.title,
              sourceType,
              [],
              feature.slug,
              RuleType.RULE,
              feature.text,
              feature.multiSelect,
              feature.choices,
              [],
              feature.chooseNum,
              feature.shortText,
              feature.level,
            ),
          );
        } else if (feature.actionType === ActionType.COUNTER) {
          updatedActions.push(
            new PlayerCharacterFeature(
              feature.title,
              sourceType,
              [],
              feature.slug,
              RuleType.RULE,
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
              RuleType.RULE,
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
      console.warn(
        "feature is not CharacterFeatureData",
        feature,
        feature.constructor.name,
      );
      updatedFeatures.push(
        new PlayerCharacterFeature(
          feature.title,
          sourceType,
          [],
          feature.slug,
          RuleType.RULE,
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
  id?: string;
  name?: string;
  player_name?: string;
  private _level: number;
  private _characterClass?: CharacterClass;
  private _characterCulture?: CharacterCulture;
  private _stats: Stats;
  private _characterLineage?: CharacterLineage;
  private _speeds: { type: string; speed: number }[];
  coin?: number;
  private _currentHealth?: number;
  private _currentStamina?: number;
  private _armorName: string;
  private _shieldName: string;
  private _range?: { min: number; max: number };
  private _items?: Item[];
  private _actions?: PlayerCharacterFeature[];
  private _counters?: PlayerCharacterFeature[];
  private _features?: PlayerCharacterFeature[];
  private _languages?: Languages[];
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
      this.id = startingCharacter.id;
      this.name = startingCharacter.name;
      this.player_name = startingCharacter.player_name;
      this._level = startingCharacter.level;
      this._stats = startingCharacter.stats;
      this.coin = startingCharacter.coin;
      this._languages = startingCharacter.languages;
      this._characterClass = startingCharacter.characterClass;
      this._characterLineage = startingCharacter.lineage;
      this._characterCulture = startingCharacter.culture;
      this._currentHealth = startingCharacter.currentHealth;
      this._currentStamina = startingCharacter.currentStamina;
      this._speeds = startingCharacter.speeds;
      this._armorName = startingCharacter.armorName;
      this._shieldName = startingCharacter.shieldName;
      this._range = startingCharacter.characterClass?.range;
      this._items = startingCharacter.items;
      this._actions = startingCharacter.actions;
      this._counters = startingCharacter.counters;
      this._features = startingCharacter.features;
      this._languages = startingCharacter.languages;
    } else {
      this._level = 1;
      this._stats = { mettle: 0, agility: 0, heart: 0, intellect: 0 };
      this.coin = 5;
      this._languages = [Languages.ALLSPEAK];
      this._characterClass = characterClass;
      this._characterLineage = lineage;
      this._characterCulture = culture;
      this.currentHealth = 0;
      this.currentStamina = 0;
      this._speeds = [{ type: "ground", speed: 30 }];
      this._armorName = "None";
      this._shieldName = "None";
      this._range = characterClass ? characterClass.range : { min: 0, max: 0 };
      this._items = [];
      this._actions = [];
      this._counters = [];
      this._features = [];
      if (characterClass)
        ({
          actions: this._actions,
          counters: this._counters,
          features: this._features,
        } = updateFeatures(FeatureSource.CLASS, characterClass, this));
      if (culture)
        ({
          actions: this._actions,
          counters: this._counters,
          features: this._features,
        } = updateFeatures(FeatureSource.CULTURE, culture, this));
      if (lineage)
        ({
          features: this._features,
          actions: this._actions,
          counters: this._counters,
        } = updateFeatures(FeatureSource.LINEAGE, lineage, this));
    }
  }

  public get level(): number {
    return this._level;
  }
  public set level(newLevel: number) {
    this._level = newLevel;
    if (this.characterClass) {
      ({
        actions: this._actions,
        counters: this._counters,
        features: this._features,
      } = updateFeatures(FeatureSource.CLASS, this.characterClass, this));
    }
    // remove veteran features if the character is less than level 8
    if (newLevel < 8)
      this._features = this._features?.filter(
        (feature) => feature.source !== FeatureSource.VETERAN_FEATURE,
      );
  }

  public get characterClass(): CharacterClassData {
    if (!this._characterClass)
      throw new Error("Character class must be set before accessing");
    return this._characterClass;
  }

  public set characterClass(characterClass: CharacterClassData) {
    this._characterClass = characterClass;
    ({
      actions: this._actions,
      counters: this._counters,
      features: this._features,
    } = updateFeatures(FeatureSource.CLASS, characterClass, this));
    this._range = characterClass.range;
    this.sortFeatures();
  }
  public get culture(): CharacterCulture {
    if (!this._characterCulture)
      throw new Error("Culture must be set before accessing");
    return this._characterCulture;
  }
  public set culture(characterCulture: CharacterCulture) {
    this._characterCulture = characterCulture;

    const updatedFeatures = updateFeatures(
      FeatureSource.CULTURE,
      characterCulture,
      this,
    );
    this._actions = updatedFeatures.actions;
    this._counters = updatedFeatures.counters;
    this._features = updatedFeatures.features;
    this.sortFeatures();
  }
  public get lineage(): CharacterLineage {
    if (!this._characterLineage)
      throw new Error("Lineage must be set before accessing");
    return this._characterLineage;
  }
  public set lineage(characterLineage: CharacterLineage) {
    this._characterLineage = characterLineage;

    const updatedFeatures = updateFeatures(
      FeatureSource.LINEAGE,
      characterLineage,
      this,
    );
    this._actions = updatedFeatures.actions;
    this._counters = updatedFeatures.counters;
    this._features = updatedFeatures.features;
    this._speeds = characterLineage.speeds;
    this.sortFeatures();
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
    this._currentStamina =
      stamina > this.maxStamina ? this.maxStamina : stamina;
  }
  public get currentHealth(): number {
    return this._currentHealth || 0;
  }
  public set currentHealth(health: number) {
    this._currentHealth = health > this.maxHealth ? this.maxHealth : health;
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

  // Derived Values
  public get armor(): number {
    return this._armorValue();
  }
  public get speeds() {
    if (
      this.lineage?.slug === "FAERY" &&
      !this._speeds.some(
        (speed) => speed.type === "flying" && speed.speed === 20,
      )
    ) {
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
        case StatOptions.METTLE.toLowerCase():
          staminaStat = this._stats.mettle;
          break;
        case StatOptions.AGILITY.toLowerCase():
          staminaStat = this._stats.agility;
          break;
        case StatOptions.HEART.toLowerCase():
          staminaStat = this._stats.heart;
          break;
        case StatOptions.INT.toLowerCase():
          staminaStat = this._stats.intellect;
          break;
      }

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
        case StatOptions.METTLE:
          statDmg = Math.max(statDmg, this.stats.mettle);
          break;
        case StatOptions.AGILITY:
          statDmg = Math.max(statDmg, this.stats.agility);
          break;
        case StatOptions.HEART:
          statDmg = Math.max(statDmg, this.stats.heart);
          break;
        case StatOptions.INT:
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
    this.sortFeatures();
    return this._actions;
  }
  public get counters() {
    this.sortFeatures();
    return this._counters;
  }
  public get features() {
    this.sortFeatures();
    return this._features;
  }
  public get languages() {
    return this._languages;
  }
  public get attack() {
    let attack = Number.MIN_SAFE_INTEGER;
    this.characterClass?.attackStat.forEach((stat) => {
      switch (stat) {
        case StatOptions.METTLE:
          attack = Math.max(attack, this.stats.mettle);
          break;
        case StatOptions.AGILITY:
          attack = Math.max(attack, this.stats.agility);
          break;
        case StatOptions.HEART:
          attack = Math.max(attack, this.stats.heart);
          break;
        case StatOptions.INT:
          attack = Math.max(attack, this.stats.intellect);
          break;
      }
    });
    return attack;
  }
  public get choices() {
    let choices: string[] = [];
    this._features?.forEach((feature) => {
      if (feature.chosen) choices = choices.concat(feature.chosen);
      if (
        feature.source === FeatureSource.NOVICE_FEATURE ||
        feature.source === FeatureSource.VETERAN_FEATURE
      )
        choices.push(feature.slug);
    });
    this._actions?.forEach((feature) => {
      if (feature.chosen) choices = choices.concat(feature.chosen);
      if (
        feature.source === FeatureSource.NOVICE_FEATURE ||
        feature.source === FeatureSource.VETERAN_FEATURE
      )
        choices.push(feature.slug);
    });
    this._counters?.forEach((feature) => {
      if (feature.chosen) choices = choices.concat(feature.chosen);
      if (
        feature.source === FeatureSource.NOVICE_FEATURE ||
        feature.source === FeatureSource.VETERAN_FEATURE
      )
        choices.push(feature.slug);
    });
    return choices;
  }

  public get noviceFeatures(): PlayerCharacterFeature[] {
    return this.allFeatures.filter((feature) => {
      feature.source === FeatureSource.NOVICE_FEATURE;
    });
  }

  public get veteranFeatures(): PlayerCharacterFeature[] {
    return this.allFeatures.filter((feature) => {
      feature.source === FeatureSource.VETERAN_FEATURE;
    });
  }

  public get allFeatures() {
    let allFeatures: PlayerCharacterFeature[] = [];
    this.sortFeatures();
    if (this._features) allFeatures = allFeatures.concat(this._features);
    if (this._actions) allFeatures = allFeatures.concat(this._actions);
    if (this._counters) allFeatures = allFeatures.concat(this._counters);

    return allFeatures;
  }

  // Helper Functions

  public updateChoices(choices: string[]): PlayerCharacter {
    const updateChosen = (features: PlayerCharacterFeature[]) => {
      features.forEach((feature) => {
        if (feature.choices) {
          const chosen: string[] = feature.choices
            .filter((choice) => {
              if (typeof choice.text === "string") {
                return choices.includes(choice.text);
              } else if ("slug" in choice) {
                return choices.includes(choice.slug);
              }
            })
            .map((choice) => {
              if (typeof choice.text === "string") {
                return choice.text;
              } else if ("slug" in choice) {
                return choice.slug;
              } else
                throw new Error(`Choice is of invalid type ${typeof choice}`);
            });
          feature.chosen = chosen;
        }
      });
    };

    if (this._features) updateChosen(this._features);
    if (this._actions) updateChosen(this._actions);
    if (this._counters) updateChosen(this._counters);

    return this;
  }

  public extractGenericFeaturesFromChoices(
    choices: string[],
    genericFeatures: PlayerCharacterFeature[],
  ): PlayerCharacter {
    choices.forEach((choice) => {
      const matchingFeature = genericFeatures.find(
        (feature) => feature.slug === choice,
      );
      if (matchingFeature) {
        this._features
          ? this._features.push(matchingFeature)
          : (this._features = [matchingFeature]);
      }
    });
    return this;
  }

  public updateFeature(updatedFeature: PlayerCharacterFeature) {
    const updateFeatureList = (
      features: PlayerCharacterFeature[] | undefined,
    ) => {
      if (!features) return;
      const index = features.findIndex(
        (feature) => feature.slug === updatedFeature.slug,
      );
      if (index !== -1) {
        features[index] = updatedFeature;
      }
    };

    updateFeatureList(this._features);
    updateFeatureList(this._actions);
    updateFeatureList(this._counters);
    this.sortFeatures();
  }
  public addGenericFeature(feature: PlayerCharacterFeature) {
    if (
      feature.source === FeatureSource.VETERAN_FEATURE ||
      feature.source === FeatureSource.NOVICE_FEATURE
    )
      this._features
        ? this._features?.push(feature)
        : (this._features = [feature]);
  }

  public removeGenericFeature(slug: string) {
    if (!this._features) return;
    const i = this._features.findIndex((feature) => feature.slug === slug);
    if (i !== -1) {
      this._features.splice(i, 1);
    }
  }
  public finishRestAndRecuperation() {
    this._currentHealth = this.maxHealth;
    this._currentStamina = this.maxStamina;
  }

  private sortFeatures() {
    const orderFeatures = (
      a: PlayerCharacterFeature,
      b: PlayerCharacterFeature,
    ) => {
      const order = {
        class: 1,
        culture: 2,
        lineage: 3,
        noviceFeature: 4,
        veteranFeature: 5,
      };
      return (
        order[a.source as keyof typeof order] -
        order[b.source as keyof typeof order]
      );
    };
    if (this._features) this._features.sort((a, b) => orderFeatures(a, b));
    if (this._actions) this._actions.sort((a, b) => orderFeatures(a, b));
    if (this._counters) this._counters.sort((a, b) => orderFeatures(a, b));
  }

  public catchBreath() {
    this.currentStamina = this.maxStamina;
    if (this.currentHealth === 0) this.currentHealth = 1;
    return this;
  }
  public nightsRest() {
    this.currentStamina = this.maxStamina;
    this.currentHealth = this.currentHealth + this.level + 1;
    return this;
  }
  public restAndRecuperate() {
    this.currentStamina = this.maxStamina;
    this.currentHealth = this.maxHealth;
    return this;
  }
}
