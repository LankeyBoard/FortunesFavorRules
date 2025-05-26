import { gql } from "@apollo/client";
export type AllShopsQueryData = {
  allShops: {
    id: string;
    description: string;
    name: string;
  }[];
};
const ALL_SHOPS_QUERY = gql`
  query GetItemShops {
    allShops {
      id
      description
      name
    }
  }
`;
export default ALL_SHOPS_QUERY;
