import PlayerCharacterSheet from "@/app/components/PlayerCharacterSheet";
import { getClient } from "@/app/utils/graphQLclient";
import { gql } from "@apollo/client";
export default async function CharacterSheetPage() {
  const query = gql`
    query GetAllCharacterOptions {
      characterClasses {
        attackStat
        complexity
        damage {
          count
          stat
          dice
          type
        }
        description
        extra {
          forms {
            armor {
              baseArmor
              stat
            }
            attackStat
            damage {
              dice
              stat
              type
              count
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
              options
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
                options
                text
                type
              }
            }
          }
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
            options
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
              options
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
                options
                text
                type
              }
            }
          }
          costsFortunesFavor
          href
          multiSelect
          ruleType
          shortText
          shortTitle
          slug
          staminaCost
          text {
            options
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
              options
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
                options
                text
                type
              }
            }
          }
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
            options
            text
            type
          }
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
