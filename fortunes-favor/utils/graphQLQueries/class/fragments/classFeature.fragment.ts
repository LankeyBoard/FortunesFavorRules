import { gql } from "@apollo/client";

const CLASS_FEATURE_FRAGMENT = gql`
  fragment FeatureFragment on CharacterClassFeature {
    actionType
    isVariant
    simpleChoices: choices {
      ... on RuleText {
        type
        choices
        text
      }
    }
    complexChoices: choices {
      ... on FeatureWithoutChoices {
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
    }
    chooseNum
    costsFortunesFavor
    href
    level
    multiSelect
    ruleType
    shortText
    shortTitle
    slug
    staminaCost
    text {
      choices
      text
      type
    }
    title
  }
`;

export default CLASS_FEATURE_FRAGMENT;
