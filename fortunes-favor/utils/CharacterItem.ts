import { Effect } from "./applyConditionalEffects";
import { BaseItem } from "./BaseItem";
import { Rarity, RechargeOn } from "./enums";
import { RuleText } from "./graphQLtypes";
import Input from "./Input";

class CharacterItem extends Input implements BaseItem {
  readonly id?: string;
  readonly title!: string;
  readonly text!: RuleText[];
  readonly isMagic: boolean;
  readonly rarity?: Rarity;
  readonly uses?: { used: number; max: number; rechargeOn: RechargeOn };
  readonly effects?: Effect[];

  constructor(
    title: string,
    text: RuleText[],
    isMagic: boolean,
    rarity?: Rarity,
    uses?: { used: number; max: number; rechargeOn: RechargeOn },
    id?: string,
    effects?: Effect[],
  ) {
    super(title, text);
    this.isMagic = isMagic;
    this.rarity = rarity;
    this.uses = uses;
    this.id = id;
    this.effects = effects;
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
