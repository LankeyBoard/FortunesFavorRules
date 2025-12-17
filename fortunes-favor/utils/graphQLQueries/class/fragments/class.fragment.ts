import { gql } from "@apollo/client";
import BEASTMASTER_PET_FRAGMENT from "./beastmaster.fragment";
import CLASS_FEATURE_FRAGMENT from "./classFeature.fragment";
import CLASS_VARIANT_FRAGMENT from "./classVariant.fragment";
import SHIFTER_FORM_FRAGMENT from "./shifterForm.fragment";

const CHARACTER_CLASS_FRAGMENT = gql`
  ${CLASS_FEATURE_FRAGMENT}
  ${CLASS_VARIANT_FRAGMENT}
  ${BEASTMASTER_PET_FRAGMENT}
  ${SHIFTER_FORM_FRAGMENT}
  fragment CharacterClassFragment on CharacterClass {
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
    img {
      target
      style
    }
    features {
      ...FeatureFragment
    }
    variants {
      ...VariantFragment
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
`;

export default CHARACTER_CLASS_FRAGMENT;
