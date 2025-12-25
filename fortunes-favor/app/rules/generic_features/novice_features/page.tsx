import { gql } from "@apollo/client";
import client from "@/utils/graphQLclient";
import GenericFeatures from "@/components/GenericFeatures";
import { Suspense } from "react";
import CHOICE_FRAGMENT from "@/utils/graphQLQueries/sharedFragments/choiceFragment";
import GenericFeatureData from "@/utils/types/genericFeatureData";
import GenericFeature from "@/utils/GenericFeature";
import convertToChoices from "@/utils/convertToChoices";
import RULE_TEXT_FRAGMENT from "@/utils/graphQLQueries/playerCharacterQueries/fragments/RuleText.fragment";
import GenericFeaturePage from "@/components/pages/GenericFeaturesPage";

const query = gql`
  ${RULE_TEXT_FRAGMENT}
  ${CHOICE_FRAGMENT}
  query noviceFeatures {
    universalFeatures(featureType: NOVICE) {
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
        ...RuleTextFragment
      }
    }
  }
`;
async function NoviceFeaturesPage() {
  const { data }: { data: GenericFeatureData } = await client.query({
    query,
  });
  return <GenericFeaturePage data={data} title="Novice Features" />;
}

export default NoviceFeaturesPage;
