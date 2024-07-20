import { gql } from "@apollo/client";
import { getClient } from "@/app/utils/graphQLclient";
import GenericFeatures from "@/app/components/GenericFeatures";
import { Suspense } from "react";

const query = gql`
  query NoviceFeatures {
    universalFeatures(featureType: NOVICE) {
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
        <Suspense>
          <GenericFeatures generic_feature_data={data.universalFeatures} />
        </Suspense>
      </div>
    </div>
  );
}

export default NoviceFeaturesPage;
