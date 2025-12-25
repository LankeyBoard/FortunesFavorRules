import { gql } from "@apollo/client";
import RULE_TEXT_FRAGMENT from "./fragments/RuleText.fragment";
import GENERIC_FEATURE_FRAGMENT from "./fragments/Feature.fragment";
import CHARACTER_CLASS_FRAGMENT from "../class/fragments/class.fragment";
import BEASTMASTER_PET_FRAGMENT from "../class/fragments/beastmaster.fragment";
import {
  CharacterClass,
  Culture,
  GenericFeature,
  Lineage,
} from "@/utils/types/types.generated";

const GET_CHARACTER_OPTIONS = gql`
  ${RULE_TEXT_FRAGMENT}
  ${BEASTMASTER_PET_FRAGMENT}
  ${GENERIC_FEATURE_FRAGMENT}
  ${CHARACTER_CLASS_FRAGMENT}
  query getCharacterOptions {
    characterClasses {
      ...CharacterClassFragment
    }
    cultures {
      description
      href
      languages
      shortTitle
      slug
      stat
      traits {
        ...GenericFeatureFragment
      }
      title
    }
    lineages {
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
        ...GenericFeatureFragment
      }
    }
    noviceFeatures: universalFeatures(featureType: NOVICE) {
      ...GenericFeatureFragment
    }
    veteranFeatures: universalFeatures(featureType: VETERAN) {
      ...GenericFeatureFragment
    }
  }
`;

export type GetCharacterOptionsData = {
  characterClasses: CharacterClass[];
  cultures: Culture[];
  lineages: Lineage[];
  noviceFeatures: GenericFeature[];
};

export default GET_CHARACTER_OPTIONS;
