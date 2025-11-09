import { gql } from "@apollo/client";

export const USES_FRAGMENT = gql`
  fragment UsesFragment on Uses {
    max
    used
    rechargeOn
  }
`;

export default USES_FRAGMENT;
