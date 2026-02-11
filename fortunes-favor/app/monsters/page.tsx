import FullPageLoading from "@/components/FullPageLoading";
import client from "@/utils/graphQLclient";
import ALL_MONSTERS_QUERY, {
  Monster,
  MonsterData,
} from "@/utils/graphQLQueries/monsters/AllMonstersQuery";
import { ApolloError } from "@apollo/client";
import { Suspense } from "react";
import MonsterCard from "@/components/blocks/MonsterCard";
import MonsterSection from "@/components/blocks/MonsterSection";
import NavSidebar from "@/components/blocks/NavSidebar";
import { NavSection } from "../rules/layout";

// type NavSection = {
//   title: string;
//   shortTitle?: string | undefined;
//   basePath: string;
//   href?: string | undefined;
//   subroutes?:
//     | {
//         title: string;
//         shortTitle?: string | undefined;
//         slug: string;
//         href: string;
//       }[]
//     | undefined;
// };

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

  const processedMonsterData = (() => {
    const result: ((typeof data.allMonsters)[number] | Monster[])[] = [];
    let currentMonsters: Monster[] = [];

    for (const monster of data.allMonsters) {
      if ("monsters" in monster) {
        // MonsterGroup - flush accumulated monsters and add group
        if (currentMonsters.length > 0) {
          result.push([...currentMonsters]);
          currentMonsters = [];
        }
        result.push(monster);
      } else {
        // Individual monster - accumulate it
        currentMonsters.push(monster);
      }
    }

    // Flush any remaining accumulated monsters
    if (currentMonsters.length > 0) {
      result.push(currentMonsters);
    }

    return result;
  })();

  return (
    <Suspense fallback={<FullPageLoading />}>
      <div className="flex flex-row flex-grow">
        <div className="fixed mb-0 md:w-64">
          <NavSidebar navMap={monstersNav} highlightTopLevel={true} />
        </div>
        <div className="ml-0 md:ml-64 w-full ">
          <div className="overflow-auto max-h-screen md:max-h-none scroll-mt-36">
            {processedMonsterData.map((m) => {
              return (
                <div
                  key={"name" in m ? m.name : m[0].name}
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
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default MonstersPage;
