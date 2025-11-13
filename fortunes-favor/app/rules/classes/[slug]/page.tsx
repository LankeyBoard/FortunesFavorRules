import ClassRule from "@/components/CharacterClass";
import client from "@/utils/graphQLclient";
import { GET_CHARACTER_CLASS } from "@/utils/graphQLQueries/class/CharacterClassQuery";
import { Suspense } from "react";

async function PlayerClass({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const { variant } = await searchParams;
  console.log("params", slug, variant);
  const { data } = await client.query({
    query: GET_CHARACTER_CLASS,
    variables: { slug: slug },
  });

  return (
    <Suspense>
      <ClassRule data={data.characterClasses[0]} variant={variant} />
    </Suspense>
  );
}

export default PlayerClass;
