import { gql } from "@apollo/client";

export const GET_CHARACTER_CLASS = gql`
  query GetClass($slug: String) {
    characterClasses(slug: $slug) {
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
        level
        multiSelect
        ruleType
        shortText
        shortTitle
        slug
        staminaCost
        text {
          choices
          text
          type
        }
        title
      }
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
  }
`;
