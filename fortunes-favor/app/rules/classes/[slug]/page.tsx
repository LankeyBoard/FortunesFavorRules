import ClassRule from "@/app/components/CharacterClass";
import { getClient } from "@/app/utils/graphQLclient";
import { gql } from "@apollo/client";
import { Suspense } from "react";

const query = gql`
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

async function PlayerClass({ params }: { params: { slug: string } }) {
  const client = getClient();
  const { data } = await client.query({
    query,
    variables: { slug: params.slug },
  });
  return (
    <Suspense>
      <ClassRule data={data.characterClasses[0]} />
    </Suspense>
  );
}

export default PlayerClass;
