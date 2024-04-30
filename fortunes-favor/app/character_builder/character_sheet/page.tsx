import PlayerCharacterSheet from "@/app/components/PlayerCharacterSheet";
import { getClient } from "@/app/utils/graphQLclient";
import { gql } from "@apollo/client";
export default async function CharacterSheetPage() {
  const query = gql`
    query AllCharacterOptions {
      cultures {
        description
        href
        languages
        shortTitle
        slug
        stat
        title
        traits {
          list
          ruleType
          rules {
            list
            rules {
              list
              ruleType
              shortText
              shortTitle
              slug
              title
              text {
                options
                text
                type
              }
            }
            ruleType
            shortText
            shortTitle
            text {
              options
              text
              type
            }
            slug
            title
          }
          shortText
          shortTitle
          slug
          title
          text {
            options
            text
            type
          }
        }
      }
      characterClasses {
        attackStat
        complexity
        damage {
          count
          dice
          stat
          type
        }
        extra {
          forms {
            armor {
              baseArmor
              stat
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
            slug
            title
          }
        }
        features {
          actionType
          choices {
            multiSelect
            options
            ruleType
            slug
            title
            text {
              text
              type
            }
          }
          costsFortunesFavor
          level
          ruleType
          rules {
            text
            type
          }
          slug
          staminaCost
          title
        }
        description
        health
        healthOnLevel
        range {
          max
          min
        }
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
              pick
              options
            }
          }
        }
      }
      lineages {
        description
        shortTitle
        size
        slug
        speed
        stat
        title
        traits {
          list
          ruleType
          rules {
            list
            ruleType
            shortText
            shortTitle
            slug
            text {
              options
              text
              type
            }
            title
          }
          shortText
          shortTitle
          slug
          text {
            options
            text
            type
          }
          title
        }
      }
    }
  `;

  const client = getClient();
  const { data } = await client.query({
    query,
  });

  return <PlayerCharacterSheet characterOptions={data} />;
}
