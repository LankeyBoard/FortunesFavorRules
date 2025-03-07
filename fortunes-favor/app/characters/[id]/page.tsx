import PlayerCharacterSheet from "@/components/CharacterSheet";

const PlayerCharacterPage = async (props: {
  params: Promise<{ id: number }>;
}) => {
  const params = await props.params;

  return <PlayerCharacterSheet characterId={params.id} />;
};

export default PlayerCharacterPage;
