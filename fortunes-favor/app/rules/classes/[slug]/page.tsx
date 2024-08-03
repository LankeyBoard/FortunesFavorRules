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
        dice
        stat
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
        complexChoices: choices {
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
        href
        costsFortunesFavor
        level
        ruleType
        shortTitle
        slug
        staminaCost
        title
        rules {
          text
          type
          options
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
      training {
        armor
        magic {
          options
          pick
        }
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
        shields
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
