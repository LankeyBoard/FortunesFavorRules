import ClassRule from "@/components/CharacterClass";
import client from "@/utils/graphQLclient";
import { GET_CHARACTER_CLASS } from "@/utils/graphQLQueries/CharacterClassQuery";
import { Suspense } from "react";

async function PlayerClass(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { data } = await client.query({
    query: GET_CHARACTER_CLASS,
    variables: { slug: params.slug },
  });
  return (
    <Suspense>
      <ClassRule data={data.characterClasses[0]} />
    </Suspense>
  );
}

export default PlayerClass;
