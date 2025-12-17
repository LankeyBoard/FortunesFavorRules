import { gql } from "@apollo/client";
import TRAIT_FRAGMENT from "../../sharedFragments/traitFragment";

const CULTURE_FRAGMENT = gql`
  fragment cultureFragment on Culture {
    description
    img {
      target
      style
    }
    href
    languages
    shortTitle
    slug
    stat
    title
    traits {
      ...TraitFragment
    }
  }
  ${TRAIT_FRAGMENT}
`;
export default CULTURE_FRAGMENT;
