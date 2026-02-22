import FullPageLoading from "@/components/FullPageLoading";
import client from "@/utils/graphQLclient";
import ALL_MONSTERS_QUERY, {
  MonsterData,
} from "@/utils/graphQLQueries/monsters/AllMonstersQuery";
import { ApolloError } from "@apollo/client";
import { Suspense } from "react";
import MonsterCard from "@/components/blocks/MonsterCard";
import MonsterSection from "@/components/blocks/MonsterSection";
import NavSidebar from "@/components/blocks/NavSidebar";
import { NavSection } from "../rules/layout";
import AlertPopup from "@/components/AlertPopup";
import RuleDisplay from "@/components/blocks/RuleDisplay";

async function MonstersPage() {
  const { data, error }: { data: MonsterData; error?: ApolloError } =
    await client.query({
      query: ALL_MONSTERS_QUERY,
    });
  if (!data && !error) return <FullPageLoading />;
  else if (error) return <div>{error.message}</div>;
  const monstersNav: NavSection[] = data.allMonsters.map((monster) => {
    return {
      title: monster.name,
      basePath: `/monsters`,
      href: `/monsters#${monster.name}`,
      subroutes:
        "monsters" in monster
          ? monster.monsters.map((m) => {
              return {
                title: m.name,
                basePath: `/monsters`,
                href: `/monsters#${m.name}`,
                slug: m.name,
              };
            })
          : undefined,
    };
  });
  return (
    <Suspense fallback={<FullPageLoading />}>
      <div className="flex flex-row flex-grow">
        <div className="flex-1 flex overflow-hidden mt-6 md:mt-0 pb-10 md:pb-0">
          <div className="flex-1 overflow-auto">
            <RuleDisplay>
              {data.allMonsters.map((m) => {
                return (
                  <div
                    key={m.name}
                    className="even:bg-purple-50/20 even:dark:bg-purple-950/20"
                  >
                    {"level" in m ? (
                      <MonsterCard monster={m} />
                    ) : (
                      <MonsterSection monsterGroup={m} />
                    )}
                  </div>
                );
              })}
            </RuleDisplay>
          </div>
        </div>
        <div className="fixed z-50">
          <NavSidebar navMap={monstersNav} highlightOnlyTopLevel={true} />
        </div>
        <AlertPopup />
      </div>
    </Suspense>
  );
}

export default MonstersPage;
