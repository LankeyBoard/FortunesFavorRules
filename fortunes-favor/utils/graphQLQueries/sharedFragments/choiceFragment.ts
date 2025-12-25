import { ActionType, RuleType } from "@/utils/enums";
import Text from "@/utils/types/text";
import { gql } from "@apollo/client";

const CHOICE_FRAGMENT = gql`
  fragment ChoiceFragment on Choice {
    isChosen
    simpleChoice: choiceRule {
      ... on RuleText {
        type
        text
      }
    }
    complexChoice: choiceRule {
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
          text
          type
        }
      }
    }
  }
`;

export default CHOICE_FRAGMENT;
