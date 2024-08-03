import { gql } from "@apollo/client";
import { getClient } from "@/app/utils/graphQLclient";
import { graphQLCulture } from "@/app/utils/graphQLtypes";
import { Suspense } from "react";
import Link from "next/link";
import TextBlock from "@/app/components/blocks/TextBlock";

const query = gql`
  query GetAllClasses {
    characterClasses {
      complexity
      description
      title
      slug
      href
    }
  }
`;

type characterClassData = {
  complexity: string;
  description: string;
  title: string;
  slug: string;
  href: string;
};
async function ClassesPage() {
  const client = getClient();
  const { data } = await client.query({
    query,
  });
  return (
    <Suspense>
      <div className="grid grid-cols-1 mb-2">
        {data.characterClasses.map((characterClass: characterClassData) => {
          return (
            <Link href={characterClass.href} key={characterClass.slug}>
              <h1>{characterClass.title}</h1>
              <p>{characterClass.description}</p>
            </Link>
          );
        })}
      </div>
    </Suspense>
  );
}

export default ClassesPage;
