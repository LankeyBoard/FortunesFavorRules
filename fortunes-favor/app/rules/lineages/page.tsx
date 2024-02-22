import lineages_data from "@/public/rules_json/lineages/lineages.json";
import Lineage from "@/app/components/Lineage";
import { getClient } from "@/app/utils/graphQLclient";
import { gql } from "@apollo/client";

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
    <div className="grid grid-cols-1 divide-y-2 divide-slate-500 mb-2">
      {data.lineages.map((lineage_data: any) => {
        return <Lineage json={lineage_data} key={lineage_data.slug} />;
      })}
    </div>
  );
}

export default LineagePage;
