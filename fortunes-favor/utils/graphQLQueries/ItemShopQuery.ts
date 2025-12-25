import { gql } from "@apollo/client";
import { RuleText } from "../graphQLtypes";
import Effect from "../types/Effect";
export const GET_ITEM_SHOP = gql`
  query GetItemShop($id: ID!) {
    itemShop(id: $id) {
      id
      name
      description
      canEdit
      itemsInStock {
        id
        title
        isMagic
        rarity
        uses {
          used
          max
          rechargeOn
        }
        text {
          text
          type
        }
        effects {
          target
          operation
          value
          condition
        }
        defaultPrice
        tags
        salePrice
        slots
      }
      itemsCouldStock {
        id
        title
        isMagic
        rarity
        uses {
          used
          max
          rechargeOn
        }
        text {
          text
          type
        }
        effects {
          target
          operation
          value
          condition
        }
        defaultPrice
        tags
        slots
      }
    }
  }
`;

type ShopItem = {
  salePrice: number | undefined;
  id: string;
  title: string;
  isMagic: boolean;
  rarity: string;
  slots: number;
  uses?: {
    used: number;
    max: number;
    rechargeOn: string;
  };
  text: RuleText[];
  effects: Effect[];
  defaultPrice: number;
  tags: string[];
};
type InStockItem = ShopItem & { salePrice?: number };

export type ItemShopQueryDataType = {
  itemShop: {
    id: string;
    name: string;
    description: string;
    canEdit: boolean;

    itemsInStock: InStockItem[];
    itemsCouldStock: ShopItem[];
  };
};
