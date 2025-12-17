import { gql } from "@apollo/client";
import CULTURE_FRAGMENT from "./fragments/cultureFragment";

const GET_ALL_CULTURES = gql`
  query GetAllCultures {
    cultures {
      ...cultureFragment
    }
  }
  ${CULTURE_FRAGMENT}
`;
export default GET_ALL_CULTURES;
