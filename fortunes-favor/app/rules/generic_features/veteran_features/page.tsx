import { gql } from "@apollo/client";
import client from "@/utils/graphQLclient";
import GenericFeatures from "@/components/GenericFeatures";
import { Suspense } from "react";

const query = gql`
  query GetVeteranFeatures {
    universalFeatures(featureType: VETERAN) {
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
      chooseNum
      featureType
      costsFortunesFavor
      href
      ruleType
      multiSelect
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
`;
async function VeteranFeaturesPage() {
  const { data } = await client.query({
    query,
  });
  return (
    <div className="grid grid-cols-1 divide-y-2 divide-slate-500 mb-2">
      <div id="novice_features">
        <div className="text-3xl tracking-wide font-bold py-4 px-5 bg-fuchsia-300 dark:bg-fuchsia-900">
          Veteran Features
        </div>
        <Suspense>
          <GenericFeatures generic_feature_data={data.universalFeatures} />
        </Suspense>
      </div>
    </div>
  );
}

export default VeteranFeaturesPage;
