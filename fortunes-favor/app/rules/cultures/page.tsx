import Culture from "@/components/Culture";
import client from "@/utils/graphQLclient";
import GET_ALL_CULTURES from "@/utils/graphQLQueries/culture/allCulturesQuery";
import { graphQLCulture } from "@/utils/graphQLtypes";
import { Suspense } from "react";

async function CulturePage() {
  const { data } = await client.query({
    query: GET_ALL_CULTURES,
  });
  return (
    <Suspense>
      <div className="grid grid-cols-1 mb-2">
        {data.cultures.map((culuture_data: graphQLCulture) => {
          return (
            <Culture
              data={culuture_data}
              key={culuture_data.slug}
              isList={true}
            />
          );
        })}
      </div>
    </Suspense>
  );
}

export default CulturePage;
