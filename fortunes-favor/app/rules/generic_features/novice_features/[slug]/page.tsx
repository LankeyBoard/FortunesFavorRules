import { FeatureLi } from "@/app/components/GenericFeatures";
import { getClient } from "@/app/utils/graphQLclient";
import { gql } from "@apollo/client";

const query = gql`
  query SearchFeatures($slug: String) {
    genericFeatures(featureType: NOVICE, slug: $slug) {
      multiSelect
      options
      ruleType
      shortText
      shortTitle
      text {
        text
        type
      }
      slug
      title
    }
  }
`;

async function NoviceFeature({ params }: { params: { slug: string } }) {
  const client = getClient();
  const { data } = await client.query({
    query,
    variables: { slug: params.slug },
  });
  return (
    <>
      <FeatureLi feature={data.genericFeatures[0]} />
    </>
  );
}

export default NoviceFeature;
