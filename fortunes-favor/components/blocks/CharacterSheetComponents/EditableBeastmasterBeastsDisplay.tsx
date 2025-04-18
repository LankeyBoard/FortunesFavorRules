import React, { Dispatch, SetStateAction } from "react";
import PlayerCharacter from "@/utils/PlayerCharacter";
import Button, { ButtonType } from "../Inputs/Button";
import { BeastDisplay } from "../BeastmasterBeastDisplay";
import { BeastMasterBeast } from "@/utils/CharacterClass";

interface EditableBeastmasterBeastsDisplayProps {
  character: PlayerCharacter;
  setCharacter: Dispatch<SetStateAction<PlayerCharacter | undefined>>;
  isEditable: boolean;
}

const EditableBeastmasterBeastsDisplay: React.FC<
  EditableBeastmasterBeastsDisplayProps
> = ({ character, setCharacter, isEditable }) => {
  console.log("beastmaster loaded");
  if (!character?.characterClass?.extra?.beastMasterPet) return <></>;
  let beasts: JSX.Element | undefined = undefined;
  if (character.beast) {
    beasts = (
      <div>
        <BeastDisplay key={character.beast.slug} beast={character.beast} />
        {isEditable && (
          <Button
            buttonType={ButtonType.simple}
            color="amber"
            onClick={() => {
              const newCharacter = new PlayerCharacter(
                undefined,
                undefined,
                undefined,
                character,
              );
              newCharacter.clearBeastmasterBeast();
              setCharacter(newCharacter);
            }}
          >
            Remove Beast Selection
          </Button>
        )}
      </div>
    );
  } else if (!isEditable) {
    beasts = (
      <div>
        <span>Beast not selected, edit your character to add one.</span>
      </div>
    );
  } else {
    beasts = (
      <>
        {character.characterClass.extra.beastMasterPet.beasts.map(
          (beast: BeastMasterBeast) => {
            return (
              <div
                key={beast.slug}
                onClick={() => {
                  const newCharacter = new PlayerCharacter(
                    undefined,
                    undefined,
                    undefined,
                    character,
                  );
                  if (newCharacter.form?.slug === beast.slug) {
                    newCharacter.clearBeastmasterBeast();
                  } else newCharacter.setBeastSlug(beast.slug);

                  setCharacter(newCharacter);
                }}
                className={
                  character.form?.slug === beast.slug
                    ? "border-2 border-amber-500 cursor-pointer"
                    : "cursor-pointer"
                }
              >
                <BeastDisplay beast={beast} />
              </div>
            );
          },
        )}
      </>
    );
  }
  return (
    <div className="mb-2">
      <h2 className="font-thin text-xl mx-auto text-center pb-0 tracking-widest md:pt-6">
        Beast
      </h2>
      {beasts}
    </div>
  );
};

export default EditableBeastmasterBeastsDisplay;
