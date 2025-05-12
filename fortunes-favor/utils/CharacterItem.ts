import { Effect } from "./applyConditionalEffects";
import { RuleText } from "./graphQLtypes";
import Input from "./Input";

export enum RechargeOn {
  NONE = "None",
  CATCH_BREATH = "Catch Your Breath",
  NIGHTS_REST = "Night's Rest",
  REST_AND_RECUPERATE = "Rest and Recuperate",
}

export enum ItemRarity {
  COMMON = "Common",
  UNCOMMON = "Uncommon",
  RARE = "Rare",
  LEGENDARY = "Legendary",
  UNIQUE = "Unique",
}

class Feature extends Input {
  readonly effects?: Effect[];

  constructor(title: string, text: [RuleText], effects?: Effect[]) {
    super(title, text);
    this.effects = effects;
  }
}

class CharacterItem extends Feature {
  readonly id?: Number;
  readonly isMagic: boolean;
  readonly rarity?: ItemRarity;
  readonly uses?: { used: number; max: number; rechargeOn: RechargeOn };
  constructor(
    title: string,
    text: [RuleText],

    isMagic: boolean,
    rarity?: ItemRarity,
    uses?: { used: number; max: number; rechargeOn: RechargeOn },
    id?: Number,
    effects?: Effect[],
  ) {
    super(title, text, effects);
    this.isMagic = isMagic;
    this.rarity = rarity;
    this.uses = uses;
    this.id = id;
  }
  public use() {
    if (!this.uses) {
      throw new Error("Item does not have uses");
    }
    this.uses.used++;
    if (this.uses.used >= this.uses.max) {
      return false;
    }
    return true;
  }
}

export default CharacterItem;
