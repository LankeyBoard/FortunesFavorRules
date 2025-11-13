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
export const LINEAGE_FRAGMENT = gql`
  fragment LineageFragment on Lineage {
    description
    href
    shortTitle
    size
    slug
    speeds {
      type
      speed
    }
    stat
    title
    traits {
      ...TraitFragment
    }
  }
  ${TRAIT_FRAGMENT}
`;
export const LINEAGE_VARIANT_FRAGMENT = gql`
  fragment LineageVariantFragment on LineageVariant {
    description
    href
    shortTitle
    size
    slug
    speeds {
      type
      speed
    }
    stat
    title
    traits {
      ...TraitFragment
    }
  }
  ${TRAIT_FRAGMENT}
`;
