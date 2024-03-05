import Culture from "@/app/components/Culture";
import { gql } from "@apollo/client";
import { getClient } from "@/app/utils/graphQLclient";
import { graphQLCulture } from "@/app/utils/graphQLtypes";
import { Suspense } from "react";

const query = gql`
  query AllCultures {
    cultures {
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
async function CulturePage() {
  const client = getClient();
  const { data } = await client.query({
    query,
  });
  return (
    <Suspense>
      <div className="grid grid-cols-1 mb-2">
        {data.cultures.map((culuture_data: graphQLCulture) => {
          return (
            <Culture
              data={culuture_data}
              key={culuture_data.slug}
              isList={true}
            />
          );
        })}
      </div>
    </Suspense>
  );
}

export default CulturePage;
