import Culture from "@/components/Culture";
import client from "@/utils/graphQLclient";
import { graphQLCulture } from "@/utils/graphQLtypes";
import { Suspense } from "react";
import FIND_CULTURE from "@/utils/graphQLQueries/culture/cultureBySlugQuery";

async function SingleCulturePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { data } = await client.query({
    query: FIND_CULTURE,
    variables: { slug: params.slug },
  });
  return (
    <Suspense>
      <div className="grid grid-cols-1 mb-2">
        {data.cultures.map((culuture_data: graphQLCulture) => {
          return <Culture data={culuture_data} key={culuture_data.slug} />;
        })}
      </div>
    </Suspense>
  );
}

export default SingleCulturePage;
