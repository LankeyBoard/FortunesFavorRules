import { gql } from "@apollo/client";
import CHOICE_FRAGMENT from "../../sharedFragments/choiceFragment";

const CLASS_FEATURE_FRAGMENT = gql`
  ${CHOICE_FRAGMENT}
  fragment FeatureFragment on CharacterClassFeature {
    actionType
    isVariant
    choices {
      ...ChoiceFragment
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
      text
      type
    }
    title
  }
`;

export default CLASS_FEATURE_FRAGMENT;
