import { FeatureLi } from "@/components/GenericFeatures";
import client from "@/utils/graphQLclient";
import { gql } from "@apollo/client";
import { Suspense } from "react";

const query = gql`
  query searchVeteranFeatures($slug: String) {
    universalFeatures(featureType: VETERAN, slug: $slug) {
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

async function VeteranFeature(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { data } = await client.query({
    query,
    variables: { slug: params.slug },
  });
  return (
    <Suspense>
      <FeatureLi feature={data.universalFeatures[0]} />
    </Suspense>
  );
}

export default VeteranFeature;
