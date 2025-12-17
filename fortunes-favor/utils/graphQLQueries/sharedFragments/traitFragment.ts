import { gql } from "@apollo/client";

const TRAIT_FRAGMENT = gql`
  fragment TraitFragment on GenericFeature {
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
    costsFortunesFavor
    href
    multiSelect
    ruleType
    shortText
    shortTitle
    slug
    staminaCost
    title
    chooseNum
    text {
      choices
      text
      type
    }
  }
`;

export default TRAIT_FRAGMENT;
