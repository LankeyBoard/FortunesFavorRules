import { gql } from "@apollo/client";
import { getClient } from "@/app/utils/graphQLclient";
import { graphQLCulture } from "@/app/utils/graphQLtypes";
import { Suspense } from "react";
import Link from "next/link";
import TextBlock from "@/app/components/blocks/TextBlock";
import { ClassTags } from "@/app/components/CharacterClass";
import { stat_options } from "@/app/enums";

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

type characterClassData = {
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
      <div className="grid grid-cols-2 gap-2">
        {data.characterClasses.map((characterClass: characterClassData) => {
          return (
            <Link
              href={characterClass.href}
              key={characterClass.slug}
              className="transition ease-in-out hover:-translate-y-1 hover:scale-105 hover:drop-shadow-sm duration-100"
            >
              <div
                id={characterClass.slug}
                className="mb-2 bg-slate-200 dark:bg-slate-800"
              >
                <div className="w-full ">
                  <div className="text-3xl tracking-wide font-bold h-16 bg-teal-300 dark:bg-teal-700">
                    <span className="float-left py-4 px-3">
                      {characterClass.title}
                    </span>{" "}
                    <span className="float-right text-base font-normal">
                      <ClassTags c={characterClass} />
                    </span>
                  </div>
                </div>

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
