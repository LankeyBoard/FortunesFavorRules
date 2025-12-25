import { gql } from "@apollo/client";
import CHOICE_FRAGMENT from "./choiceFragment";

const TRAIT_FRAGMENT = gql`
  ${CHOICE_FRAGMENT}
  fragment TraitFragment on GenericFeature {
    actionType
    isVariant
    choices {
      ...ChoiceFragment
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
      text
      type
    }
  }
`;

export default TRAIT_FRAGMENT;
