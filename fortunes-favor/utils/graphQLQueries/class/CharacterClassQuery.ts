import { gql } from "@apollo/client";
import CHARACTER_CLASS_FRAGMENT from "./fragments/class.fragment";

export const GET_CHARACTER_CLASS = gql`
  ${CHARACTER_CLASS_FRAGMENT}
  query GetClass($slug: String) {
    characterClasses(slug: $slug) {
      ...CharacterClassFragment
    }
  }
`;
