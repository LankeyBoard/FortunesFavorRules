import client from "@/utils/graphQLclient";
import Lineage from "@/components/Lineage";
import { Lineage as LineageType } from "@/utils/types/types.generated";
import GET_LINEAGE from "@/utils/graphQLQueries/lineage/lineageQuery";

async function SingleLineagePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const { variant } = await searchParams;
  const { data } = await client.query({
    query: GET_LINEAGE,
    variables: { slug: slug },
  });

  return (
    <div className="grid grid-cols-1 mb-2">
      {data.lineages.map((lineage_data: LineageType) => {
        return (
          <Lineage
            data={lineage_data}
            key={lineage_data.slug}
            variantSearchParam={variant}
          />
        );
      })}
    </div>
  );
}

export default SingleLineagePage;
