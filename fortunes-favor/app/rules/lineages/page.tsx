import { getClient } from "@/app/utils/graphQLclient";
import { gql } from "@apollo/client";
import Lineage from "@/app/components/Lineage";
import { graphQLLineage } from "@/app/utils/graphQLtypes";

const query = gql`
  query AllLineages {
    lineages {
      description
      size
      slug
      speed
      title
      stat
      traits {
        list
        ruleType
        rules {
          list
          ruleType
          slug
          title
          text {
            text
            type
          }
        }
        slug
        title
        text {
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
