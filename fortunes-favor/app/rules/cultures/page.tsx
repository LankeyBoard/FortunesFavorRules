import culuture_data from "@/public/rules_json/cultures/cultures.json";
import Culture from "@/app/components/Culture";
import { gql } from "@apollo/client";
import { getClient } from "@/app/utils/graphQLclient";

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
    <div className="grid grid-cols-1 divide-y-2 divide-slate-500 mb-2">
      {data.cultures.map((culuture_data: any) => {
        return <Culture json={culuture_data} key={culuture_data.slug} />;
      })}
    </div>
  );
}

export default CulturePage;
