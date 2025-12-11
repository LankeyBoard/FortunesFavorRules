import { gql } from "@apollo/client";
import RULE_TEXT_FRAGMENT from "./fragments/RuleText.fragment";
import GENERIC_FEATURE_FRAGMENT from "./fragments/Feature.fragment";
import CHARACTER_CLASS_FRAGMENT from "../class/fragments/class.fragment";
import BEASTMASTER_PET_FRAGMENT from "../class/fragments/beastmaster.fragment";

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
  characterClasses: {
    attackStat: string;
    complexity: number;
    damage: {
      count: number;
      stat: string;
      dice: string;
      type: string;
    }[];
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

export default GET_CHARACTER_OPTIONS;
