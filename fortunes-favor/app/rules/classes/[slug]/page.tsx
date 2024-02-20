import ClassRule from "@/app/components/Class";
import { getClient } from "@/app/utils/graphQLclient";
import { gql } from "@apollo/client";

const query = gql`
  query GetClass($slug: String) {
    characterClasses(slug: $slug) {
      attackStat
      complexity
      damage {
        count
        dice
        stat
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
    <>
      <ClassRule data={data.characterClasses[0]} />
    </>
  );
}

export default PlayerClass;
