import { gql } from "@apollo/client";
import { getClient } from "@/app/utils/graphQLclient";
import GenericFeatures from "@/app/components/GenericFeatures";

const query = gql`
  query NoviceFeatures {
    genericFeatures(featureType: NOVICE) {
      multiSelect
      options
      ruleType
      shortText
      slug
      text {
        text
        type
      }
      title
    }
  }
`;
async function NoviceFeaturesPage() {
  const client = getClient();
  const { data } = await client.query({
    query,
  });
  return (
    <div className="grid grid-cols-1 divide-y-2 divide-slate-500 mb-2">
      <div id="novice_features">
        <div className="text-3xl tracking-wide font-bold py-4 px-5 bg-fuchsia-300 dark:bg-fuchsia-900">
          Novice Features
        </div>
        <GenericFeatures generic_feature_data={data.genericFeatures} />
      </div>
    </div>
  );
}

export default NoviceFeaturesPage;
