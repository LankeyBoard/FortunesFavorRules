import CharacterSheet from "@/components/CharacterSheet";
import VerifyLogin from "@/components/VerifyLogin";

const CreateCharacterPage = () => {
  return (
    <VerifyLogin>
      <CharacterSheet characterId={undefined} />
    </VerifyLogin>
  );
};

export default CreateCharacterPage;
