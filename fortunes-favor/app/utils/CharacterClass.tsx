import { complexity_options, findEnum, stat_options } from "../enums";
import CharacterFeature from "./Feature";

export type TrainingOptions = {
  pick: number;
  options: [string];
};

export default class CharacterClass {
  title: string;
  slug: string;
  flavor_text: string;
  complexity: complexity_options;
  health: number;
  lvlHealth: number;
  staminaStat: stat_options;
  stamina: number;
  lvlStamina: number;
  training: {
    armor?: [string];
    shield?: [string];
    weapon?: {
      melee?: TrainingOptions;
      ranged?: TrainingOptions;
      special?: TrainingOptions;
    };
    magic?: TrainingOptions;
  };
  attkStat: stat_options;
  range: {
    min: number;
    max: number;
  };
  dmg: {
    dice: number;
    count: number;
    stat: stat_options;
  };
  features: CharacterFeature[];
  constructor(data: any) {
    console.log("Feature - ", data);
    this.title = data.title;
    this.slug = data.slug;
    this.flavor_text = data.description;
    const c = findEnum(data.complexity, complexity_options);
    this.complexity = complexity_options.error;
    if (c) {
      this.complexity = c;
    } else {
      console.log("Error matching complexity %s in data file", data.complexity);
    }
    this.health = data.health;
    this.lvlHealth = data.healthOnLevel;
    const ss = findEnum(data.staminaStat, stat_options);
    this.staminaStat = stat_options.error;
    if (ss) {
      this.staminaStat = ss;
    } else {
      console.log(
        "Error matching stamina stat %s in data file",
        data.staminaStat
      );
    }
    this.stamina = data.stamina;
    this.lvlStamina = data.staminaOnLevel;
    this.training = {
      armor: data.training.armor,
      shield: data.training.shields,
      weapon: {
        melee: data.training.weapons.melee,
        ranged: data.training.weapons.ranged,
        special: data.training.weapons.special,
      },
      magic: data.training.magic,
    };
    const as = findEnum(data.attackStat, stat_options);
    this.attkStat = stat_options.error;
    if (as) {
      this.attkStat = as;
    } else {
      console.log(
        "Error matching attack stat %s in data file",
        data.attackStat
      );
    }
    this.range = {
      min: data.range.min,
      max: data.range.max,
    };
    const ds = findEnum(data.damage.stat, stat_options);
    let dmgStat: stat_options = stat_options.error;
    if (ds) {
      dmgStat = ds;
    } else {
      console.log(
        "Error matching attack dmg stat %s in data file",
        data.damage.stat
      );
    }
    this.dmg = {
      dice: data.damage.dice,
      count: data.damage.count,
      stat: dmgStat,
    };
    this.features = data.features.map(
      (feature_data: any) => new CharacterFeature(feature_data)
    );
  }
}
