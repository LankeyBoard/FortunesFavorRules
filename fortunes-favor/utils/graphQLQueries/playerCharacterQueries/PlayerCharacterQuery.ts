import { gql } from "@apollo/client";
import RULE_TEXT_FRAGMENT from "./fragments/RuleText.fragment";
import USES_FRAGMENT from "./fragments/Uses.fragment";
import EFFECT_FRAGMENT from "./fragments/Effect.fragment";
import ITEM_FRAGMENT from "./fragments/Item.fragment";
import { Effect } from "../../applyConditionalEffects";
import CHARACTER_CLASS_FRAGMENT from "../class/fragments/class.fragment";
import {
  LINEAGE_FRAGMENT,
  LINEAGE_VARIANT_FRAGMENT,
} from "../lineage/fragments/lineageFragments";
import TRAIT_FRAGMENT from "../sharedFragments/traitFragment";
import CHOICE_FRAGMENT from "../sharedFragments/choiceFragment";
import { Spell } from "../AllSpellsQuery";

const GET_CHARACTER_INFO = gql`
  ${RULE_TEXT_FRAGMENT}
  ${USES_FRAGMENT}
  ${EFFECT_FRAGMENT}
  ${ITEM_FRAGMENT}
  ${CHARACTER_CLASS_FRAGMENT}
  ${LINEAGE_FRAGMENT}
  ${LINEAGE_VARIANT_FRAGMENT}
  ${TRAIT_FRAGMENT}
  ${CHOICE_FRAGMENT}
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
        ...CharacterClassFragment
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
          ...TraitFragment
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
          ...TraitFragment
        }
      }
      spells {
        name
        description
        duration
        castingTime
        level
        range
        type
      }

      noviceFeatures {
        actionType
        choices {
          ...ChoiceFragment
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
          ...RuleTextFragment
        }
      }
      veteranFeatures {
        actionType
        choices {
          ...ChoiceFragment
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
          ...RuleTextFragment
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
        ...TraitFragment
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
      choices {
        ...ChoiceFragment
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
        ...RuleTextFragment
      }
    }
    veteranFeatures: universalFeatures(featureType: VETERAN) {
      actionType
      choices {
        ...ChoiceFragment
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
        ...RuleTextFragment
      }
    }
    me {
      id
    }
  }
`;

export type ChoiceData = {
  isChosen: boolean;
  simpleChoice?: TextData;
  complexChoice?: {
    href: string;
    shortTitle?: string;
    actionType?: string;
    costsFortunesFavor: boolean;
    multiSelect: boolean;
    ruleType: string;
    shortText: string;
    slug: string;
    staminaCost: number;
    title: string;
    text: TextData[];
  };
};

type classFeatureData = {
  actionType: string;
  choices: ChoiceData[];
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
};

type ClassData = {
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
  features: classFeatureData[];
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
  possibleSpells?: Spell[];
};

type TextData = {
  text: string;
  type: string;
};

type lineageData = {
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
    choices: ChoiceData[];
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
    text: TextData[];
  }[];
};

type cultureData = {
  description: string;
  href: string;
  languages: string[];
  shortTitle: string;
  slug: string;
  stat: string;
  traits: {
    actionType: string;
    choices: ChoiceData[];
    chooseNum: number;
    costsFortunesFavor: boolean;
    href: string;
    multiSelect: boolean;
    ruleType: string;
    shortText: string;
    shortTitle: string;
    slug: string;
    staminaCost: number;
    text: TextData[];
    title: string;
  }[];
  title: string;
};

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
    characterClass: ClassData;
    noviceFeatures: {
      actionType: string;
      choices: ChoiceData[];
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
        text: string;
        type: string;
      }[];
    }[];
    veteranFeatures: {
      actionType: string;
      choices: ChoiceData[];
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
        text: string;
        type: string;
      }[];
    }[];
    items: {
      slots: number;
      id: string;
      title: string;
      text: TextData[];
      rarity: string;
      uses: {
        max: number;
        used: number;
        rechargeOn: string;
      };
      isMagic: boolean;
      effects: Effect[];
    }[];
    characterCulture: cultureData;
    characterLineage: lineageData;
    spells: Spell[];
  };
  characterClasses: ClassData[];
  cultures: cultureData[];
  lineages: lineageData[];
  noviceFeatures: {
    actionType: string;
    choices: ChoiceData[];
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
      text: string;
      type: string;
    }[];
  }[];
  veteranFeatures: {
    actionType: string;
    choices: ChoiceData[];
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
      text: string;
      type: string;
    }[];
  }[];
};

export default GET_CHARACTER_INFO;
