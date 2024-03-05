import Culture from "@/app/components/Culture";
import { gql } from "@apollo/client";
import { getClient } from "@/app/utils/graphQLclient";
import { graphQLCulture } from "@/app/utils/graphQLtypes";
import { Suspense } from "react";

const query = gql`
  query FindCulture($slug: String) {
    cultures(slug: $slug) {
      description
      title
      languages
      slug
      stat
      traits {
        list
        ruleType
        rules {
          ruleType
          text {
            text
            type
          }
          title
          slug
          list
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
async function SingleCulturePage({ params }: { params: { slug: string } }) {
  const client = getClient();
  const { data } = await client.query({
    query,
    variables: { slug: params.slug },
  });
  return (
    <Suspense>
      <div className="grid grid-cols-1 mb-2">
        {data.cultures.map((culuture_data: graphQLCulture) => {
          return <Culture data={culuture_data} key={culuture_data.slug} />;
        })}
      </div>
    </Suspense>
  );
}

export default SingleCulturePage;
