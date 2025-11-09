import { gql } from "@apollo/client";

export const DEFLECT_FRAGMENT = gql`
  fragment DeflectFragment on Deflect {
    dice
    count
    flat
  }
`;

export default DEFLECT_FRAGMENT;
