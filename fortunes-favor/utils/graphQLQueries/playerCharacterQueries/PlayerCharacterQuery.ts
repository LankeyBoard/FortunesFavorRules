import { gql } from "@apollo/client";
import DAMAGE_FRAGMENT from "./fragments/Damage.fragment";
import DEFLECT_FRAGMENT from "./fragments/Deflect.fragment";
import RULE_TEXT_FRAGMENT from "./fragments/RuleText.fragment";
import USES_FRAGMENT from "./fragments/Uses.fragment";
import EFFECT_FRAGMENT from "./fragments/Effect.fragment";
import ITEM_FRAGMENT from "./fragments/Item.fragment";
import { Effect } from "../../applyConditionalEffects";
import FORM_FRAGMENT from "./fragments/Form.fragment";
import FEATURE_FRAGMENT from "./fragments/Feature.fragment";
import CHARACTER_CLASS_FRAGMENT from "../class/fragments/class.fragment";
import BEASTMASTER_PET_FRAGMENT from "../class/fragments/beastmaster.fragment";
import {
  LINEAGE_FRAGMENT,
  LINEAGE_VARIANT_FRAGMENT,
} from "../lineage/fragments/lineageFragments";

const GET_CHARACTER_INFO = gql`
  ${DAMAGE_FRAGMENT}
  ${DEFLECT_FRAGMENT}
  ${FEATURE_FRAGMENT}
  ${RULE_TEXT_FRAGMENT}
  ${USES_FRAGMENT}
  ${EFFECT_FRAGMENT}
  ${ITEM_FRAGMENT}
  ${BEASTMASTER_PET_FRAGMENT}
  ${FORM_FRAGMENT}
  ${CHARACTER_CLASS_FRAGMENT}
  ${LINEAGE_FRAGMENT}
  ${LINEAGE_VARIANT_FRAGMENT}
  query getCharacter($id: ID!) {
    character(id: $id) {
      createdBy {
        id
      }
      campaign {
        id
        name
      }
      agility
      armorName
      baseDamage
      coin
      counter
      currentHealth
      currentStamina
      featureChoiceSlugs
      heart
      id
      intellect
      languages
      level
      maxHealth
      mettle
      maxSlots
      maxStamina
      name
      rangeMax
      shieldName
      rangeMin
      characterClass {
        attackStat
        complexity
        damage {
          ...DamageFragment
        }
        deflect {
          ...DeflectFragment
        }
        description
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
        shortTitle
        range {
          max
          min
        }
        slug
        stamina
        staminaOnLevel
        staminaStat
        title
        features {
          ...CharacterClassFeatureFragment
        }
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
      items {
        ...ItemFragment
      }
      characterCulture {
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
      characterLineage {
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
    }
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
        actionType
        simpleChoices: choices {
          ...RuleTextFragment
        }
        complexChoices: choices {
          ...FeatureWithoutChoicesFragment
        }
        chooseNum
        costsFortunesFavor
        href
        multiSelect
        ruleType
        shortText
        shortTitle
        slug
        staminaCost
        text {
          choices
          type
          text
        }
        title
      }
      title
    }
    lineages {
      ...LineageFragment
      variants {
        ...LineageVariantFragment
      }
    }
    noviceFeatures: universalFeatures(featureType: NOVICE) {
      actionType
      simpleChoices: choices {
        ...RuleTextFragment
      }
      complexChoices: choices {
        ...FeatureWithoutChoicesFragment
      }
      chooseNum
      featureType
      costsFortunesFavor
      href
      ruleType
      multiSelect
      shortText
      shortTitle
      slug
      staminaCost
      title
      text {
        choices
        text
        type
      }
    }
    veteranFeatures: universalFeatures(featureType: VETERAN) {
      actionType
      simpleChoices: choices {
        ...RuleTextFragment
      }
      complexChoices: choices {
        ...FeatureWithoutChoicesFragment
      }
      chooseNum
      featureType
      costsFortunesFavor
      href
      ruleType
      multiSelect
      shortText
      shortTitle
      slug
      staminaCost
      title
      text {
        choices
        text
        type
      }
    }
    me {
      id
    }
  }
`;

export type GetCharacterData = {
  character: {
    maxSlots: number;
    agility: number;
    armorName: string;
    baseDamage: number;
    coin: number;
    counter: number;
    currentHealth: number;
    currentStamina: number;
    featureChoiceSlugs: string[];
    heart: number;
    id: string;
    intellect: number;
    languages: string[];
    level: number;
    maxHealth: number;
    mettle: number;
    maxStamina: number;
    name: string;
    rangeMax: number;
    shieldName: string;
    rangeMin: number;
    characterClass: {
      attackStat: string;
      complexity: number;
      damage: {
        count: number;
        stat: string;
        dice: string;
        type: string;
      }[];
      deflect: {
        dice: string;
        count: number;
        flat: number;
      };
      description: string;
      extra: {
        forms: {
          armor: {
            baseArmor: number;
            stat: string;
          };
          attackStat: string;
          damage: {
            dice: string;
            stat: string;
            type: string;
            count: number;
          }[];
          features: {
            text: string;
            title: string;
          }[];
          href: string;
          shortTitle: string;
          size: string;
          slug: string;
          title: string;
        }[];
      };
      health: number;
      healthOnLevel: number;
      href: string;
      shortTitle: string;
      range: {
        max: number;
        min: number;
      };
      slug: string;
      stamina: number;
      staminaOnLevel: number;
      staminaStat: string;
      title: string;
      features: {
        actionType: string;
        simpleChoices: {
          type: string;
          choices: string[];
          text: string;
        }[];
        complexChoices: {
          href: string;
          shortTitle: string;
          actionType: string;
          costsFortunesFavor: boolean;
          multiSelect: boolean;
          ruleType: string;
          shortText: string;
          slug: string;
          staminaCost: number;
          title: string;
          text: {
            choices: string[];
            text: string;
            type: string;
          }[];
        }[];
        chooseNum: number;
        level: number;
        href: string;
        ruleType: string;
        multiSelect: boolean;
        shortText: string;
        slug: string;
        shortTitle: string;
        staminaCost: number;
        title: string;
        text: {
          choices: string[];
          text: string;
          type: string;
        }[];
        costsFortunesFavor: boolean;
      }[];
      training: {
        armor: string[];
        magic: {
          options: string[];
          pick: number;
        };
        shields: string[];
        weapons: {
          melee: {
            options: string[];
            pick: number;
          };
          ranged: {
            options: string[];
            pick: number;
          };
          special: {
            options: string[];
            pick: number;
          };
        };
      };
    };
    items: {
      slots: number;
      id: string;
      title: string;
      text: {
        text: string;
        type: string;
      }[];
      rarity: string;
      uses: {
        max: number;
        used: number;
        rechargeOn: string;
      };
      isMagic: boolean;
      effects: Effect[];
    }[];
    characterCulture: {
      description: string;
      href: string;
      languages: string[];
      shortTitle: string;
      slug: string;
      stat: string;
      traits: {
        actionType: string;
        simpleChoices: {
          type: string;
          choices: string[];
          text: string;
        }[];
        complexChoices: {
          href: string;
          shortTitle: string;
          actionType: string;
          costsFortunesFavor: boolean;
          multiSelect: boolean;
          ruleType: string;
          shortText: string;
          slug: string;
          staminaCost: number;
          title: string;
          text: {
            choices: string[];
            text: string;
            type: string;
          }[];
        }[];
        chooseNum: number;
        costsFortunesFavor: boolean;
        href: string;
        multiSelect: boolean;
        ruleType: string;
        shortText: string;
        shortTitle: string;
        slug: string;
        staminaCost: number;
        text: {
          choices: string[];
          type: string;
          text: string;
        }[];
        title: string;
      }[];
      title: string;
    };
    characterLineage: {
      description: string;
      href: string;
      shortTitle: string;
      size: string;
      slug: string;
      speeds: {
        type: string;
        speed: number;
      }[];
      stat: string;
      title: string;
      traits: {
        actionType: string;
        simpleChoices: {
          type: string;
          choices: string[];
          text: string;
        }[];
        complexChoices: {
          href: string;
          shortTitle: string;
          actionType: string;
          costsFortunesFavor: boolean;
          multiSelect: boolean;
          ruleType: string;
          shortText: string;
          slug: string;
          staminaCost: number;
          title: string;
          text: {
            choices: string[];
            text: string;
            type: string;
          }[];
        }[];
        chooseNum: number;
        costsFortunesFavor: boolean;
        href: string;
        multiSelect: boolean;
        ruleType: string;
        shortText: string;
        shortTitle: string;
        slug: string;
        staminaCost: number;
        title: string;
        text: {
          choices: string[];
          text: string;
          type: string;
        }[];
      }[];
    };
  };
  characterClasses: {
    attackStat: string;
    complexity: number;
    damage: {
      count: number;
      stat: string;
      dice: string;
      type: string;
    }[];
    deflect: {
      dice: string;
      count: number;
      flat: number;
    };
    description: string;
    extra: {
      forms: {
        armor: {
          baseArmor: number;
          stat: string;
        };
        attackStat: string;
        damage: {
          dice: string;
          stat: string;
          type: string;
          count: number;
        }[];
        features: {
          text: string;
          title: string;
        }[];
        href: string;
        shortTitle: string;
        size: string;
        slug: string;
        title: string;
      }[];
    };
    health: number;
    healthOnLevel: number;
    href: string;
    shortTitle: string;
    range: {
      max: number;
      min: number;
    };
    slug: string;
    stamina: number;
    staminaOnLevel: number;
    staminaStat: string;
    title: string;
    features: {
      actionType: string;
      simpleChoices: {
        type: string;
        choices: string[];
        text: string;
      }[];
      complexChoices: {
        href: string;
        shortTitle: string;
        actionType: string;
        costsFortunesFavor: boolean;
        multiSelect: boolean;
        ruleType: string;
        shortText: string;
        slug: string;
        staminaCost: number;
        title: string;
        text: {
          choices: string[];
          text: string;
          type: string;
        }[];
      }[];
      chooseNum: number;
      level: number;
      href: string;
      ruleType: string;
      multiSelect: boolean;
      shortText: string;
      slug: string;
      shortTitle: string;
      staminaCost: number;
      title: string;
      text: {
        choices: string[];
        text: string;
        type: string;
      }[];
      costsFortunesFavor: boolean;
    }[];
    training: {
      armor: string[];
      magic: {
        options: string[];
        pick: number;
      };
      shields: string[];
      weapons: {
        melee: {
          options: string[];
          pick: number;
        };
        ranged: {
          options: string[];
          pick: number;
        };
        special: {
          options: string[];
          pick: number;
        };
      };
    };
  }[];
  cultures: {
    description: string;
    href: string;
    languages: string[];
    shortTitle: string;
    slug: string;
    stat: string;
    traits: {
      actionType: string;
      simpleChoices: {
        type: string;
        choices: string[];
        text: string;
      }[];
      complexChoices: {
        href: string;
        shortTitle: string;
        actionType: string;
        costsFortunesFavor: boolean;
        multiSelect: boolean;
        ruleType: string;
        shortText: string;
        slug: string;
        staminaCost: number;
        title: string;
        text: {
          choices: string[];
          text: string;
          type: string;
        }[];
      }[];
      chooseNum: number;
      costsFortunesFavor: boolean;
      href: string;
      multiSelect: boolean;
      ruleType: string;
      shortText: string;
      shortTitle: string;
      slug: string;
      staminaCost: number;
      text: {
        choices: string[];
        type: string;
        text: string;
      }[];
      title: string;
    }[];
    title: string;
  }[];
  lineages: {
    description: string;
    href: string;
    shortTitle: string;
    size: string;
    slug: string;
    speeds: {
      type: string;
      speed: number;
    }[];
    stat: string;
    title: string;
    traits: {
      actionType: string;
      simpleChoices: {
        type: string;
        choices: string[];
        text: string;
      }[];
      complexChoices: {
        href: string;
        shortTitle: string;
        actionType: string;
        costsFortunesFavor: boolean;
        multiSelect: boolean;
        ruleType: string;
        shortText: string;
        slug: string;
        staminaCost: number;
        title: string;
        text: {
          choices: string[];
          text: string;
          type: string;
        }[];
      }[];
      chooseNum: number;
      costsFortunesFavor: boolean;
      href: string;
      multiSelect: boolean;
      ruleType: string;
      shortText: string;
      shortTitle: string;
      slug: string;
      staminaCost: number;
      title: string;
      text: {
        choices: string[];
        text: string;
        type: string;
      }[];
    }[];
  }[];
  noviceFeatures: {
    actionType: string;
    simpleChoices?: {
      type: string;
      choices: string[];
      text: string;
    }[];
    complexChoices?: {
      href: string;
      shortTitle: string;
      actionType: string;
      costsFortunesFavor: boolean;
      multiSelect: boolean;
      ruleType: string;
      shortText: string;
      slug: string;
      staminaCost: number;
      title: string;
      text: {
        choices: string[];
        text: string;
        type: string;
      }[];
    }[];
    chooseNum: number;
    featureType: string;
    costsFortunesFavor: boolean;
    href: string;
    ruleType: string;
    multiSelect: boolean;
    shortText: string;
    shortTitle: string;
    slug: string;
    staminaCost: number;
    title: string;
    text: {
      choices: string[];
      text: string;
      type: string;
    }[];
  }[];
  veteranFeatures: {
    actionType: string;
    simpleChoices?: {
      type: string;
      choices: string[];
      text: string;
    }[];
    complexChoices?: {
      href: string;
      shortTitle: string;
      actionType: string;
      costsFortunesFavor: boolean;
      multiSelect: boolean;
      ruleType: string;
      shortText: string;
      slug: string;
      staminaCost: number;
      title: string;
      text: {
        choices: string[];
        text: string;
        type: string;
      }[];
    }[];
    chooseNum: number;
    featureType: string;
    costsFortunesFavor: boolean;
    href: string;
    ruleType: string;
    multiSelect: boolean;
    shortText: string;
    shortTitle: string;
    slug: string;
    staminaCost: number;
    title: string;
    text: {
      choices: string[];
      text: string;
      type: string;
    }[];
  }[];
};

export default GET_CHARACTER_INFO;
