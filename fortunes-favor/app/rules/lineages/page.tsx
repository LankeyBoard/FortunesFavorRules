import client from "@/utils/graphQLclient";
import Lineage from "@/components/Lineage";
import GET_ALL_LINEAGES from "@/utils/graphQLQueries/lineage/allLineagesQuery";
import { Lineage as LineageType } from "@/utils/types/types.generated";

async function LineagePage() {
  const { data } = await client.query({
    query: GET_ALL_LINEAGES,
  });
  return (
    <div className="grid grid-cols-1 mb-2">
      {data.lineages.map((lineage_data: LineageType) => {
        return (
          <Lineage data={lineage_data} key={lineage_data.slug} isList={true} />
        );
      })}
    </div>
  );
}

export default LineagePage;
