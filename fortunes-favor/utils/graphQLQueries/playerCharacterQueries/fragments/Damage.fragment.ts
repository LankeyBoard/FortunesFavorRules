import { gql } from "@apollo/client";

export const DAMAGE_FRAGMENT = gql`
  fragment DamageFragment on Damage {
    count
    stat
    dice
    type
  }
`;

export default DAMAGE_FRAGMENT;
