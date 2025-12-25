import { gql } from "@apollo/client";

const UPDATE_SHOP_MUTATION = gql`
  mutation UpdateShop($id: ID!, $itemShopInput: ItemShopInput!) {
    updateShop(id: $id, input: $itemShopInput) {
      id
      name
      description
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

export type UpdateShopInputType = {
  id: string;
  input: {
    name: string;
    description: string;
    itemsInStock: {
      id?: string;
      title: string;
      isMagic: boolean;
      rarity: string;
      uses?: {
        used: number;
        max: number;
        rechargeOn: string;
      };
      text: {
        text: string;
        type?: string;
        choices?: string[];
      }[];
      effects: {
        target: string;
        operation: string;
        value: number;
        condition?: string;
      }[];
      defaultPrice: number;
      tags: string[];
      salePrice?: number;
    }[];
    itemsCouldStock: {
      id?: string;
      title: string;
      isMagic: boolean;
      rarity: string;
      uses?: {
        used: number;
        max: number;
        rechargeOn: string;
      };
      text: {
        text: string;
        type?: string;
        choices?: string[];
      }[];
      effects: {
        target: string;
        operation: string;
        value: number;
        condition?: string;
      }[];
      defaultPrice: number;
      tags: string[];
    }[];
  };
};

export default UPDATE_SHOP_MUTATION;
