import { complexity_options, findEnum, stat_options } from "../enums";
import CharacterFeature from "./Feature";

export default class CharacterClass {
  name: string;
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
      melee?: [string];
      ranged?: [string];
      special?: [string];
    };
    magic?: [string];
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
  constructor(json: any) {
    console.log("Feature - ", json);
    this.name = json.name;
    this.slug = json.slug;
    this.flavor_text = json.flavor_text;
    const c = findEnum(json.complexity, complexity_options);
    this.complexity = complexity_options.error;
    if (c) {
      this.complexity = c;
    } else {
      console.log("Error matching complexity %s in json file", json.complexity);
    }
    this.health = json.health;
    this.lvlHealth = json.health_on_level;
    const ss = findEnum(json.stamina_stat, stat_options);
    this.staminaStat = stat_options.error;
    if (ss) {
      this.staminaStat = ss;
    } else {
      console.log(
        "Error matching stamina stat %s in json file",
        json.stamina_stat
      );
    }
    this.stamina = json.stamina;
    this.lvlStamina = json.stamina_on_level;
    this.training = {
      armor: json.training.armor,
      shield: json.training.shields,
      weapon: {
        melee: json.training.weapons.melee,
        ranged: json.training.weapons.ranged,
        special: json.training.weapons.special,
      },
      magic: json.training.magic,
    };
    const as = findEnum(json.attack_stat, stat_options);
    this.attkStat = stat_options.error;
    if (as) {
      this.attkStat = as;
    } else {
      console.log(
        "Error matching attack stat %s in json file",
        json.attack_stat
      );
    }
    this.range = {
      min: json.range.min,
      max: json.range.max,
    };
    const ds = findEnum(json.damage.stat, stat_options);
    let dmgStat: stat_options = stat_options.error;
    if (ds) {
      dmgStat = ds;
    } else {
      console.log(
        "Error matching attack dmg stat %s in json file",
        json.damage.stat
      );
    }
    this.dmg = {
      dice: json.damage.dice,
      count: json.damage.count,
      stat: dmgStat,
    };
    this.features = json.features.map(
      (json_feature: any) => new CharacterFeature(json_feature)
    );
  }
}
