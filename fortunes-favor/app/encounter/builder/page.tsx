import EncounterForm from "@/components/blocks/EncounterForm";
import FullPageLoading from "@/components/FullPageLoading";
import client from "@/utils/graphQLclient";
import ALL_MONSTERS_QUERY, {
  MonsterData,
} from "@/utils/graphQLQueries/monsters/AllMonstersQuery";
import { ApolloError } from "@apollo/client";

const EncounterBuilderPage = async () => {
  const { data, error }: { data: MonsterData; error?: ApolloError } =
    await client.query({
      query: ALL_MONSTERS_QUERY,
    });
  if (!data && !error) return <FullPageLoading />;
  else if (error) return <div>{error.message}</div>;
  const flatMonsters = data.allMonsters.flatMap((m) => {
    return "monsters" in m ? m.monsters : m;
  });
  return <EncounterForm allMonsters={flatMonsters} />;
};

export default EncounterBuilderPage;
