import { gql } from "@apollo/client";

export const RULE_TEXT_FRAGMENT = gql`
  fragment RuleTextFragment on RuleText {
    text
    type
    choices
  }
`;

export default RULE_TEXT_FRAGMENT;
