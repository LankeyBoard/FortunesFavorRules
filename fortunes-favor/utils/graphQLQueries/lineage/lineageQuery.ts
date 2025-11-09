import { gql } from "@apollo/client";
import {
  LINEAGE_FRAGMENT,
  LINEAGE_VARIANT_FRAGMENT,
} from "./fragments/lineageFragments";

const GET_LINEAGE = gql`
  query GetLineage($slug: String) {
    lineages(slug: $slug) {
      ...LineageFragment
      variants {
        ...LineageVariantFragment
      }
    }
  }
  ${LINEAGE_FRAGMENT}
  ${LINEAGE_VARIANT_FRAGMENT}
`;
export default GET_LINEAGE;
