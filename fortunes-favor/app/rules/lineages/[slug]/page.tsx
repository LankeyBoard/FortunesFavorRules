import { getClient } from "@/app/utils/graphQLclient";
import { gql } from "@apollo/client";
import { graphQLLineage } from "@/app/utils/graphQLtypes";
import Lineage from "@/app/components/Lineage";

const query = gql`
  query GetLineage($slug: String) {
    lineages(slug: $slug) {
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

async function SingleLineagePage({ params }: { params: { slug: string } }) {
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
