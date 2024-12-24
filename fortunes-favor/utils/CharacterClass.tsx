import { complexity_options, findEnum, stat_options } from "./enums";
import CharacterFeature from "./CharacterFeature";
import { CharacterClass } from "./graphQLtypes";

export type TrainingOptions = {
  pick?: number;
  options: [string];
};

export default class CharacterClassData implements CharacterClass {
  title: string;
  slug: string;
  description: string[];
  complexity: complexity_options;
  health: number;
  healthOnLevel: number;
  staminaStat: stat_options;
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
  attackStat: stat_options[];
  range: {
    min: number;
    max: number;
  };
  damage: {
    dice: number;
    count: number;
    stat: stat_options[];
  };
  deflect: {
    dice: number;
    count: number;
    flat: number;
  }
  features: CharacterFeature[];
  extra: any;
  href: string;
  constructor(data: any) {
    this.title = data.title;
    this.slug = data.slug;
    this.description = data.description;
    this.href = data.href;
    const c = findEnum(data.complexity, complexity_options);
    this.complexity = complexity_options.error;
    if (c) {
      this.complexity = c;
    } else {
      console.error(
        "Error matching complexity %s in data file",
        data.complexity
      );
    }
    this.health = data.health;
    this.healthOnLevel = data.healthOnLevel;
    const ss = findEnum(data.staminaStat, stat_options);
    this.staminaStat = stat_options.error;
    if (ss) {
      this.staminaStat = ss;
    } else {
      console.error(
        "Error matching stamina stat %s in data file",
        data.staminaStat
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
        as.push(findEnum(stat, stat_options));
      });
    }
    this.attackStat = [stat_options.error];
    if (as) {
      this.attackStat = as;
    } else {
      console.error(
        "Error matching attack stat %s in data file",
        data.attackStat
      );
    }
    this.range = {
      min: data.range.min,
      max: data.range.max,
    };
    const ds = new Array();
    if (Array.isArray(data.damage.stat)) {
      data.damage.stat.forEach((stat: string) => {
        ds.push(findEnum(stat, stat_options));
      });
    }
    let dmgStat = [stat_options.error];
    if (ds) {
      dmgStat = ds;
    } else {
      console.error(
        "Error matching attack stat %s in data file",
        data.damage.stat
      );
    }
    this.damage = {
      dice: data.damage.dice,
      count: data.damage.count,
      stat: dmgStat,
    };
    this.deflect = data.deflect
    this.features = data.features.map(
      (feature_data: any) => new CharacterFeature(feature_data)
    );
    this.extra = data.extra;
  }
}
