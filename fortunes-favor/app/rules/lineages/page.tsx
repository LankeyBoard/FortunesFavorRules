import { getClient } from "@/app/utils/graphQLclient";
import { gql } from "@apollo/client";
import Lineage from "@/app/components/Lineage";
import { graphQLLineage } from "@/app/utils/graphQLtypes";

const query = gql`
  query GetAllLineages {
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

async function LineagePage() {
  const client = getClient();
  const { data } = await client.query({
    query,
  });
  return (
    <div className="grid grid-cols-1 mb-2">
      {data.lineages.map((lineage_data: graphQLLineage) => {
        return (
          <Lineage data={lineage_data} key={lineage_data.slug} isList={true} />
        );
      })}
    </div>
  );
}

export default LineagePage;
