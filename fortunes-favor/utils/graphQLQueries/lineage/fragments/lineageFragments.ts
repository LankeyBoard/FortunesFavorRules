import { gql } from "@apollo/client";
import TRAIT_FRAGMENT from "../../sharedFragments/traitFragment";

export const LINEAGE_FRAGMENT = gql`
  fragment LineageFragment on Lineage {
    description
    img {
      target
      style
    }
    href
    shortTitle
    size
    slug
    speeds {
      type
      speed
    }
    stat
    title
    traits {
      ...TraitFragment
    }
  }
  ${TRAIT_FRAGMENT}
`;
export const LINEAGE_VARIANT_FRAGMENT = gql`
  fragment LineageVariantFragment on LineageVariant {
    description
    href
    shortTitle
    size
    slug
    speeds {
      type
      speed
    }
    stat
    title
    traits {
      ...TraitFragment
    }
  }
  ${TRAIT_FRAGMENT}
`;
