import ClassRule from "@/app/components/CharacterClass";
import { getClient } from "@/app/utils/graphQLclient";
import { gql } from "@apollo/client";
import { Suspense } from "react";

const query = gql`
  query GetClass3($slug: String) {
    characterClasses(slug: $slug) {
      attackStat
      complexity
      damage {
        count
        dice
        stat
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
