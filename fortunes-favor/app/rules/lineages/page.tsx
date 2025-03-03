import client from "@/utils/graphQLclient";
import { gql } from "@apollo/client";
import Lineage from "@/components/Lineage";
import { graphQLLineage } from "@/utils/graphQLtypes";

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
  }
`;

async function LineagePage() {
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
