import { gql } from "@apollo/client";

const GET_CHARACTER_OPTIONS = gql`
  query getCharacterOptions {
    characterClasses {
      attackStat
      complexity
      damage {
        count
        stat
        dice
        type
      }
      deflect {
        dice
        count
        flat
      }
      description
      extra {
        beastMasterPet {
          title
          slug
          description
          beasts {
            abilities {
              text
              title
              type
            }
            damage {
              count
              dice
              stat
              type
            }
            health {
              base
              perLevel
            }
            size
            slug
            speed {
              speed
              type
            }
            stats {
              agility
              heart
              intellect
              mettle
            }
            title
          }
        }
        forms {
          armor {
            stat
            baseArmor
          }
          attackStat
          damage {
            count
            dice
            stat
            type
          }
          features {
            text
            title
          }
          href
          shortTitle
          size
          title
          slug
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
        actionType
        simpleChoices: choices {
          ... on RuleText {
            type
            choices
            text
          }
        }
        complexChoices: choices {
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
              choices
              text
              type
            }
          }
        }
        chooseNum
        level
        href
        ruleType
        multiSelect
        shortText
        slug
        shortTitle
        staminaCost
        title
        text {
          choices
          text
          type
        }
        costsFortunesFavor
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
          ... on RuleText {
            type
            choices
            text
          }
        }
        complexChoices: choices {
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
              choices
              text
              type
            }
          }
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
        actionType
        simpleChoices: choices {
          ... on RuleText {
            type
            choices
            text
          }
        }
        complexChoices: choices {
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
              choices
              text
              type
            }
          }
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
        title
        text {
          choices
          text
          type
        }
      }
    }
    noviceFeatures: universalFeatures(featureType: NOVICE) {
      actionType
      simpleChoices: choices {
        ... on RuleText {
          type
          choices
          text
        }
      }
      complexChoices: choices {
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
            choices
            text
            type
          }
        }
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
        ... on RuleText {
          type
          choices
          text
        }
      }
      complexChoices: choices {
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
            choices
            text
            type
          }
        }
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
