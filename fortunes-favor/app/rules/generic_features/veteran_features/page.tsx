import { gql } from "@apollo/client";
import client from "@/utils/graphQLclient";
import GenericFeatures from "@/components/GenericFeatures";
import { Suspense } from "react";
import CHOICE_FRAGMENT from "@/utils/graphQLQueries/sharedFragments/choiceFragment";
import GenericFeaturePage from "@/components/pages/GenericFeaturesPage";

const query = gql`
  ${CHOICE_FRAGMENT}
  query GetVeteranFeatures {
    universalFeatures(featureType: VETERAN) {
      actionType
      choices {
        ...ChoiceFragment
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
  return <GenericFeaturePage data={data} title="Veteran Features" />;
}

export default VeteranFeaturesPage;
