import { Languages, ActionType, RuleType, StatOptions } from "./enums";
import CharacterClassData from "./CharacterClass";
import CharacterCulture from "./CharacterCulture";
import CharacterFeatureData from "./CharacterFeature";
import CharacterLineage from "./CharacterLineage";
import GenericFeatureData from "./GenericFeatureData";
import { FeatureChoices, RuleText } from "./graphQLtypes";
import CharacterClass from "./CharacterClass";
import Item, { RechargeOn } from "./Item";

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

export enum FeatureSource {
  CLASS = "class",
  CULTURE = "culture",
  LINEAGE = "lineage",
  NOVICE_FEATURE = "noviceFeature",
  VETERAN_FEATURE = "veteranFeature",
}

export enum ShieldType {
  NONE = "none",
  LIGHT = "light",
  MEDIUM = "medium",
  HEAVY = "heavy",
}

export enum ArmorType {
  NONE = "none",
  LIGHT = "light",
  MEDIUM = "medium",
  HEAVY = "heavy",
}

const downgradeDice = (dice: number, count: number) => {
  let updatedDice = { dice, count };
  if (dice === 6 && count > 1) {
    updatedDice.dice = 12;
    updatedDice.count -= 1;
  } else {
    if (dice > 4) {
      updatedDice.dice -= 2;
    }
  }
  return updatedDice;
};

const upgradeDice = (dice: number, count: number) => {
  let updatedDice = { dice, count };
  if (dice === 12) {
    updatedDice.dice = 6;
    updatedDice.count += 1;
  } else {
    updatedDice.dice += 2;
  }
  return updatedDice;
};
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

const enum RestType {
  CATCH_BREATH = "catchBreath",
  NIGHTS_REST = "nightsRest",
  REST_AND_RECUPERATE = "restAndRecuperate",
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
  coin?: number;
  private _currentHealth?: number;
  private _currentStamina?: number;
  private _armorName: ArmorType;
  private _shieldName: ShieldType;
  private _range?: { min: number; max: number };
  private _items: Item[];
  private _actions?: PlayerCharacterFeature[];
  private _counters?: PlayerCharacterFeature[];
  private _features?: PlayerCharacterFeature[];
  private _languages?: Languages[];

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
      this._armorName =
        ArmorType[
          startingCharacter.armorName.toUpperCase() as keyof typeof ArmorType
        ] || ArmorType.NONE;
      this._shieldName =
        ShieldType[
          startingCharacter.shieldName.toUpperCase() as keyof typeof ShieldType
        ] || ShieldType.NONE;
      this._range = startingCharacter.characterClass?.range;
      this._items = startingCharacter.items;
      this._actions = startingCharacter.actions;
      this._counters = startingCharacter.counters;
      this._features = startingCharacter.features;
      this._languages = startingCharacter.languages;
      this._items = startingCharacter.items;
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
      this._armorName = ArmorType.NONE;
      this._shieldName = ShieldType.NONE;
      this._range = characterClass ? characterClass.range : { min: 0, max: 0 };
      this._items = [];
      this._actions = [];
      this._counters = [];
      this._features = [];
      this._items = [];
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

  public get armorName(): ArmorType {
    return this._armorName;
  }
  public set armorName(name: ArmorType) {
    this._armorName = name.toLowerCase() as ArmorType;
  }
  public get shieldName(): ShieldType {
    return this._shieldName;
  }
  public set shieldName(name: ShieldType) {
    this._shieldName = name.toLowerCase() as ShieldType;
  }

  // Derived Values
  public get armor(): number {
    let armor = 10 + this.stats.agility;
    switch (this._armorName) {
      case ArmorType.LIGHT:
        armor = 12 + this.stats.agility;
        break;
      case ArmorType.MEDIUM:
        armor = 14 + Math.min(this.stats.agility, 2);
        break;
      case ArmorType.HEAVY:
        armor = 17;
        break;
      case ArmorType.NONE:
        if (
          this.characterClass?.slug === "BRAWLER" &&
          this.armorName.toLowerCase() === "none"
        ) {
          armor = 10 + this.stats.mettle + Math.min(this.stats.agility, 2);
        }
        break;
    }
    switch (this._shieldName) {
      case ShieldType.LIGHT:
        if (this.stats.agility >= 3) {
          armor += 1;
        }
        break;
      case ShieldType.MEDIUM:
        if (this.stats.agility >= 1 && this.stats.mettle >= 1) {
          armor += 2;
        }
        break;
      case ShieldType.HEAVY:
        if (this.stats.mettle >= 3) {
          armor += 2;
        }
        break;
    }
    return armor;
  }
  public get speeds() {
    return this.lineage?.speeds;
  }

  public get deflect(): { flat: number; dice: number; count: number } {
    if (!this.characterClass)
      throw new Error("Deflect cannot be calculated without a class");
    if (this.shieldName === ShieldType.LIGHT) {
      return {
        ...this.characterClass?.deflect,
        ...upgradeDice(
          this.characterClass?.deflect.dice,
          this.characterClass?.deflect.count,
        ),
      };
    } else if (this.shieldName === ShieldType.HEAVY) {
      return {
        ...this.characterClass?.deflect,
        flat: this.characterClass?.deflect.flat + 3,
      };
    }
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
    return this.armor - 5;
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

    if (this.shieldName && this.shieldName !== "none") {
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

  public set items(items: Item[]) {
    this._items = items;
  }

  public addItem(item: Item) {
    this._items.push(item);
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

  public get deflectDice() {
    return 1 + Math.floor(this.level / 2);
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
    this._items.forEach((item) => {
      if (item.uses && item.uses.rechargeOn === RechargeOn.CATCH_BREATH) {
        item.uses.used = 0;
      }
    });
    return this;
  }
  public nightsRest() {
    this.currentStamina = this.maxStamina;
    this.currentHealth = this.currentHealth + this.level + 1;
    this._items.forEach((item) => {
      if (item.uses && item.uses.rechargeOn === RechargeOn.NIGHTS_REST) {
        item.uses.used = 0;
      }
    });
    return this;
  }
  public restAndRecuperate() {
    this.currentStamina = this.maxStamina;
    this.currentHealth = this.maxHealth;
    this._items.forEach((item) => {
      if (
        item.uses &&
        item.uses.rechargeOn === RechargeOn.REST_AND_RECUPERATE
      ) {
        item.uses.used = 0;
      }
    });
    return this;
  }
}
