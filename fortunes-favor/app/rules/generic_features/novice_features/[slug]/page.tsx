import { FeatureLi } from "@/components/GenericFeatures";
import GenericFeaturePage from "@/components/pages/GenericFeaturesPage";
import convertToChoices from "@/utils/convertToChoices";
import GenericFeature from "@/utils/GenericFeature";
import client from "@/utils/graphQLclient";
import CHOICE_FRAGMENT from "@/utils/graphQLQueries/sharedFragments/choiceFragment";
import GenericFeatureData from "@/utils/types/genericFeatureData";
import { gql } from "@apollo/client";
import { Suspense } from "react";

const query = gql`
  ${CHOICE_FRAGMENT}
  query SearchNoviceFeatures($slug: String) {
    universalFeatures(featureType: NOVICE, slug: $slug) {
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

async function NoviceFeature(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { data }: { data: GenericFeatureData } = await client.query({
    query,
    variables: { slug: params.slug },
  });

  return <GenericFeaturePage data={data} />;
}

export default NoviceFeature;
