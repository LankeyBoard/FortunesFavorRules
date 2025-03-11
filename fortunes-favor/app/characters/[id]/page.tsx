import CharacterSheet from "@/components/CharacterSheet";

const PlayerCharacterPage = async (props: {
  params: Promise<{ id: number }>;
}) => {
  const params = await props.params;

  return <CharacterSheet characterId={params.id} />;
};

export default PlayerCharacterPage;
