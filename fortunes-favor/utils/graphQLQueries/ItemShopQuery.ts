import { gql } from "@apollo/client";
import { RuleText } from "../graphQLtypes";
import Effect from "../types/Effect";
export const GET_ITEM_SHOP = gql`
  query GetItemShop($id: ID!) {
    itemShop(id: $id) {
      id
      name
      description
      createdBy {
        id
      }
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
          choices
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
          choices
        }
        effects {
          target
          operation
          value
          condition
        }
        defaultPrice
        tags
      }
    }
  }
`;

type ShopItem = {
  id: string;
  title: string;
  isMagic: boolean;
  rarity: string;
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
    createdBy: {
      id: string;
    }[];

    itemsInStock: InStockItem[];
    itemsCouldStock: ShopItem[];
  };
};
