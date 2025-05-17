import { BaseItem } from "./BaseItem";
import { Rarity, RechargeOn } from "./enums";
import { RuleText } from "./graphQLtypes";
import Effect from "./types/Effect";

export class ShopItem implements BaseItem {
  id?: string;
  title: string;
  text: RuleText[];
  isMagic: boolean;
  rarity: Rarity;
  uses?: {
    used: number;
    max: number;
    rechargeOn: RechargeOn;
  };
  effects: Effect[];
  tags: string[];
  defaultPrice: number;
  salePrice?: number;
  inStock: boolean;

  constructor(
    title: string,
    text: RuleText[],
    isMagic: boolean,
    rarity: Rarity,
    effects: {
      target: string;
      operation: string;
      value: number;
      condition?: string;
    }[],
    tags: string[],
    defaultPrice: number,
    inStock: boolean,
    id?: string,
    uses?: {
      used: number;
      max: number;
      rechargeOn: RechargeOn;
    },
    salePrice?: number,
  ) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.isMagic = isMagic;
    this.rarity = rarity;
    this.uses = uses;
    this.effects = effects;
    this.tags = tags;
    this.defaultPrice = defaultPrice;
    this.salePrice = salePrice;
    this.inStock = inStock;
  }
  public get price() {
    return this.salePrice ? this.salePrice : this.defaultPrice;
  }
  public get onSale() {
    return this.salePrice && this.salePrice < this.defaultPrice;
  }
}

export class ItemShop {
  id?: string;
  name: string;
  description: string;
  itemsInStock: ShopItem[];
  itemsCouldStock: ShopItem[];

  constructor(
    name: string,
    description: string,
    itemsInStock: ShopItem[],
    itemsCouldStock: ShopItem[],
    id?: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.itemsInStock = itemsInStock;
    this.itemsCouldStock = itemsCouldStock;
  }
}
