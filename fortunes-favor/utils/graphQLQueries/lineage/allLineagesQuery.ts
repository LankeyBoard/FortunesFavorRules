import { gql } from "@apollo/client";
import {
  LINEAGE_FRAGMENT,
  LINEAGE_VARIANT_FRAGMENT,
} from "./fragments/lineageFragments";

const GET_ALL_LINEAGES = gql`
  query GetAllLineages {
    lineages {
      ...LineageFragment
      variants {
        ...LineageVariantFragment
      }
    }
  }
  ${LINEAGE_FRAGMENT}
  ${LINEAGE_VARIANT_FRAGMENT}
`;
export default GET_ALL_LINEAGES;
