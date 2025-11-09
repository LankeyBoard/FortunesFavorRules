import { gql } from "@apollo/client";
import BEASTMASTER_PET_FRAGMENT from "./beastmaster.fragment";
import CLASS_FEATURE_FRAGMENT from "./classFeature.fragment";
import SHIFTER_FORM_FRAGMENT from "./shifterForm.fragment";

const CLASS_VARIANT_FRAGMENT = gql`
  fragment VariantFragment on CharacterClassVariant {
    attackStat
    complexity
    damage {
      count
      stat
      dice
      type
    }
    deflect {
      count
      dice
      flat
    }
    description
    features {
      ...FeatureFragment
    }
    extra {
      beastMasterPet {
        ...BeastmasterPetFragment
      }
      forms {
        ...FormFragment
      }
    }
    health
    healthOnLevel
    href
    range {
      max
      min
    }
    shortTitle
    slug
    stamina
    staminaOnLevel
    staminaStat
    title
    training {
      armor
      magic {
        options
        pick
      }
      shields
      weapons {
        melee {
          options
          pick
        }
        ranged {
          options
          pick
        }
        special {
          options
          pick
        }
      }
    }
  }
  ${CLASS_FEATURE_FRAGMENT}
  ${BEASTMASTER_PET_FRAGMENT}
  ${SHIFTER_FORM_FRAGMENT}
`;

export default CLASS_VARIANT_FRAGMENT;
