import { FeatureLi } from "@/components/GenericFeatures";
import GenericFeaturePage from "@/components/pages/GenericFeaturesPage";
import client from "@/utils/graphQLclient";
import CHOICE_FRAGMENT from "@/utils/graphQLQueries/sharedFragments/choiceFragment";
import { gql } from "@apollo/client";
import { Suspense } from "react";

const query = gql`
  ${CHOICE_FRAGMENT}
  query searchVeteranFeatures($slug: String) {
    universalFeatures(featureType: VETERAN, slug: $slug) {
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

async function VeteranFeature(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { data } = await client.query({
    query,
    variables: { slug: params.slug },
  });
  return <GenericFeaturePage data={data} />;
}

export default VeteranFeature;
