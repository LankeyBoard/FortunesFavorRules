import { Effect } from "./applyConditionalEffects";
import { Rarity, RechargeOn } from "./enums";
import { RuleText } from "./graphQLtypes";

export interface BaseItem {
  id?: string; // Optional unique identifier
  title: string; // Item title
  text: RuleText[]; // Descriptive text for the item
  isMagic: boolean; // Whether the item is magical
  rarity?: Rarity; // Rarity of the item
  uses?: {
    used: number;
    max: number;
    rechargeOn: RechargeOn;
  }; // Optional usage details
  effects?: Effect[]; // Optional effects of the item
  tags?: string[]; // Optional tags for categorization
}
