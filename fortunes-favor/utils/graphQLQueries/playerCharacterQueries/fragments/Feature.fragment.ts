import { gql } from "@apollo/client";
import FEATURE_WITHOUT_CHOICES_FRAGMENT from "./FeatureWithoutChoices.fragment";
import RULE_TEXT_FRAGMENT from "./RuleText.fragment";

const FEATURE_FRAGMENT = gql`
  ${FEATURE_WITHOUT_CHOICES_FRAGMENT}
  ${RULE_TEXT_FRAGMENT}

  fragment CharacterClassFeatureFragment on CharacterClassFeature {
    actionType
    simpleChoices: choices {
      ...RuleTextFragment
    }
    complexChoices: choices {
      ...FeatureWithoutChoicesFragment
    }
    chooseNum
    level
    href
    ruleType
    multiSelect
    shortText
    slug
    shortTitle
    staminaCost
    title
    text {
      ...RuleTextFragment
    }
    costsFortunesFavor
  }

  fragment GenericFeatureFragment on GenericFeature {
    actionType
    simpleChoices: choices {
      ...RuleTextFragment
    }
    complexChoices: choices {
      ...FeatureWithoutChoicesFragment
    }
    href
    ruleType
    multiSelect
    shortText
    slug
    shortTitle
    staminaCost
    title
    chooseNum
    text {
      ...RuleTextFragment
    }
    costsFortunesFavor
  }
`;

export default FEATURE_FRAGMENT;
