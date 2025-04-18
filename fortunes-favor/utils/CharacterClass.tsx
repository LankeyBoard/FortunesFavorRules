import { ComplexityOptions, findEnum, StatOptions } from "./enums";
import CharacterFeature from "./CharacterFeature";
import { CharacterClass } from "./graphQLtypes";
import { Form } from "@/components/blocks/FormDisplay";

export type TrainingOptions = {
  pick?: number;
  options: [string];
};
export type BeastMasterBeasts = {
  title: string;
  slug: string;
  description: string;
  beasts: [BeastMasterBeast];
};

export type BeastMasterBeast = {
  abilities: {
    text: string;
    title: string;
    type: string;
  }[];
  damage: {
    count: number;
    dice: string;
    stat: [string];
    type: [string];
  };
  health: {
    base: number;
    perLevel: number;
  };
  size: string;
  slug: string;
  speed: {
    speed: number;
    type: string;
  }[];
  stats: {
    agility: number;
    heart: number;
    intellect: number;
    mettle: number;
  };
  title: string;
};

export type Extra = {
  beastMasterPet?: BeastMasterBeasts;
  forms?: Form[];
};

export default class CharacterClassData implements CharacterClass {
  title: string;
  slug: string;
  description: string[];
  complexity: ComplexityOptions;
  health: number;
  healthOnLevel: number;
  staminaStat: StatOptions;
  stamina: number;
  staminaOnLevel: number;
  training: {
    armor: string[];
    shields: string[];
    weapons: {
      melee: TrainingOptions;
      ranged: TrainingOptions;
      special: TrainingOptions;
    };
    magic: TrainingOptions;
  };
  attackStat: StatOptions[];
  range: {
    min: number;
    max: number;
  };
  damage: {
    dice: number;
    count: number;
    stat: StatOptions[];
  };
  deflect: {
    dice: number;
    count: number;
    flat: number;
  };
  features: CharacterFeature[];
  extra: Extra;
  href: string;
  constructor(data: any) {
    this.title = data.title;
    this.slug = data.slug;
    this.description = data.description;
    this.href = data.href;
    const c = findEnum(data.complexity, ComplexityOptions);
    this.complexity = ComplexityOptions.ERROR;
    if (c) {
      this.complexity = c;
    } else {
      console.error(
        "Error matching complexity %s in data file",
        data.complexity,
      );
    }
    this.health = data.health;
    this.healthOnLevel = data.healthOnLevel;
    const ss = findEnum(data.staminaStat, StatOptions);
    this.staminaStat = StatOptions.error;
    if (ss) {
      this.staminaStat = ss;
    } else {
      console.error(
        "Error matching stamina stat %s in data file",
        data.staminaStat,
      );
    }
    this.stamina = data.stamina;
    this.staminaOnLevel = data.staminaOnLevel;
    this.training = {
      armor: data.training.armor,
      shields: data.training.shields,
      weapons: {
        melee: data.training.weapons.melee,
        ranged: data.training.weapons.ranged,
        special: data.training.weapons.special,
      },
      magic: data.training.magic,
    };
    if (this.training.armor === null) this.training.armor = ["None"];
    else if (!this.training.armor.includes("None"))
      this.training.armor = ["None"].concat([...this.training.armor]);
    if (this.training.shields === null) this.training.shields = ["None"];
    else if (!this.training.shields.includes("None"))
      this.training.shields = ["None"].concat([...this.training.shields]);
    const as = new Array();
    if (Array.isArray(data.attackStat)) {
      data.attackStat.forEach((stat: string) => {
        as.push(findEnum(stat, StatOptions));
      });
    }
    this.attackStat = [StatOptions.error];
    if (as) {
      this.attackStat = as;
    } else {
      console.error(
        "Error matching attack stat %s in data file",
        data.attackStat,
      );
    }
    this.range = {
      min: data.range.min,
      max: data.range.max,
    };
    const ds = new Array();
    if (Array.isArray(data.damage.stat)) {
      data.damage.stat.forEach((stat: string) => {
        ds.push(findEnum(stat, StatOptions));
      });
    }
    let dmgStat = [StatOptions.error];
    if (ds) {
      dmgStat = ds;
    } else {
      console.error(
        "Error matching attack stat %s in data file",
        data.damage.stat,
      );
    }
    this.damage = {
      dice: data.damage.dice,
      count: data.damage.count,
      stat: dmgStat,
    };
    this.deflect = data.deflect;
    this.features = data.features.map(
      (feature_data: any) => new CharacterFeature(feature_data),
    );
    this.extra = data.extra;
  }
}
