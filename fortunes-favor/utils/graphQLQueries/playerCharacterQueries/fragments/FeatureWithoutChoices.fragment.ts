import { gql } from "@apollo/client";

export const FEATURE_WITHOUT_CHOICES_FRAGMENT = gql`
  fragment FeatureWithoutChoicesFragment on FeatureWithoutChoices {
    href
    shortTitle
    actionType
    costsFortunesFavor
    multiSelect
    ruleType
    shortText
    slug
    staminaCost
    title
    text {
      choices
      text
      type
    }
  }
`;

export default FEATURE_WITHOUT_CHOICES_FRAGMENT;
