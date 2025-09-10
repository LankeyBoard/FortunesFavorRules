import { gql } from "@apollo/client";
export type ItemSectionData = {
  me: {
    characters: {
      id: string;
      name: string;
      coin: number;
      campaign: { id: string };
    }[];
  };
  itemShop: { campaign: { id: string } };
};
const ITEM_SECTION_QUERY = gql`
  query ItemSection($shopId: ID!) {
    me {
      characters {
        id
        name
        coin
        campaign {
          id
        }
      }
    }
    itemShop(id: $shopId) {
      campaign {
        id
      }
    }
  }
`;
export default ITEM_SECTION_QUERY;
