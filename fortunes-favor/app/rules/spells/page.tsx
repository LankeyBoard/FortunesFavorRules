import FullPageLoading from "@/components/FullPageLoading";
import SpellsPage from "@/components/pages/SpellPage";
import client from "@/utils/graphQLclient";
import ALL_SPELLS_QUERY, {
  SpellQueryData,
} from "@/utils/graphQLQueries/AllSpellsQuery";
import { ApolloError } from "@apollo/client";
import React, { Suspense } from "react";

const SpellList: React.FC = async () => {
  const { data, error }: { data: SpellQueryData; error?: ApolloError } =
    await client.query({
      query: ALL_SPELLS_QUERY,
    });

  if (!data && !error) return <FullPageLoading />;
  else if (error) return <div>{error.message}</div>;
  else
    return (
      <Suspense fallback={<FullPageLoading />}>
        <SpellsPage data={data} />
      </Suspense>
    );
};

export default SpellList;
