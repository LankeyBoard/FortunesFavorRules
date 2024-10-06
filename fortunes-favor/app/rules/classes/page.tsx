import { gql } from "@apollo/client";
import { getClient } from "@/app/utils/graphQLclient";
import { Suspense } from "react";
import Link from "next/link";
import { ClassTitleAndTags } from "@/app/components/CharacterClass";
import { stat_options } from "@/app/enums";
import CharacterClass from "../../utils/CharacterClass";
const query = gql`
  query GetAllClasses {
    characterClasses {
      complexity
      description
      title
      slug
      href
      attackStat
      damage {
        stat
      }
      staminaStat
    }
  }
`;

export type characterClassData = {
  complexity: string;
  description: string;
  title: string;
  slug: string;
  href: string;
  attackStat: stat_options[];
  damage: {
    stat: stat_options[];
  };
  staminaStat: stat_options;
};

async function ClassesPage() {
  const client = getClient();
  const { data } = await client.query({
    query,
  });
  return (
    <Suspense>
      <div className="md:grid md:grid-cols-2 md:gap-2">
        {data.characterClasses.map((characterClass: CharacterClass) => {
          return (
            <Link
              href={characterClass?.href || "?"}
              key={characterClass.slug}
              className="transition ease-in-out hover:-translate-y-1 hover:scale-105 hover:drop-shadow-sm duration-100"
            >
              <div
                id={characterClass.slug}
                className="mb-2 bg-slate-200 dark:bg-slate-800"
              >
                <ClassTitleAndTags classRules={characterClass} />

                <div className="clear-both pb-2">
                  <div className="mx-3">
                    <p className="italic">{characterClass.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Suspense>
  );
}

export default ClassesPage;
