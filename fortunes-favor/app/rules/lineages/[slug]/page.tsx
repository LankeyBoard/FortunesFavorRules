import { getClient } from "@/app/utils/graphQLclient";
import { gql } from "@apollo/client";
import { graphQLLineage } from "@/app/utils/graphQLtypes";
import Lineage from "@/app/components/Lineage";

const query = gql`
  query GetLineage($slug: String) {
    lineages(slug: $slug) {
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

async function SingleLineagePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const client = getClient();
  const { data } = await client.query({
    query,
    variables: { slug: params.slug },
  });
  return (
    <div className="grid grid-cols-1 mb-2">
      {data.lineages.map((lineage_data: graphQLLineage) => {
        return <Lineage data={lineage_data} key={lineage_data.slug} />;
      })}
    </div>
  );
}

export default SingleLineagePage;
