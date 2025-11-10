import { gql } from "@apollo/client";

export const EFFECT_FRAGMENT = gql`
  fragment EffectFragment on Effect {
    target
    operation
    value
    condition
  }
`;

export default EFFECT_FRAGMENT;
