import { gql } from "@apollo/client";
import RULE_TEXT_FRAGMENT from "./RuleText.fragment";
import CHOICE_FRAGMENT from "../../sharedFragments/choiceFragment";

const GENERIC_FEATURE_FRAGMENT = gql`
  ${RULE_TEXT_FRAGMENT}
  ${CHOICE_FRAGMENT}

  fragment GenericFeatureFragment on GenericFeature {
    actionType
    isVariant
    choices {
      ...ChoiceFragment
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

export default GENERIC_FEATURE_FRAGMENT;
