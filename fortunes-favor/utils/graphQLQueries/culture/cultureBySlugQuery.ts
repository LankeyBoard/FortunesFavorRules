import { gql } from "@apollo/client";
import CULTURE_FRAGMENT from "./fragments/cultureFragment";

const FIND_CULTURE = gql`
  query FindCulture($slug: String) {
    cultures(slug: $slug) {
      ...cultureFragment
    }
  }
  ${CULTURE_FRAGMENT}
`;

export default FIND_CULTURE;
