import { gql } from "@apollo/client";

const CREATE_SHOP_MUTATION = gql`
  mutation CreateShop($itemShopInput: ItemShopInput!) {
    createShop(input: $itemShopInput) {
      id
    }
  }
`;

export default CREATE_SHOP_MUTATION;
