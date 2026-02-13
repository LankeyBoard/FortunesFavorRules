import PlayerCharacter from "@/utils/PlayerCharacter";
import React, { Dispatch, SetStateAction } from "react";
import NumInput from "../Inputs/NumInput";
import SmallField from "../SmallField";
import LargeField from "../LargeField";
import CharacterItems from "./CharacterItems";
import EditableShifterFormDisplay from "./EditableFormDisplay";
import EditableBeastmasterBeastsDisplay from "./EditableBeastmasterBeastsDisplay";
import { CharacterSheetViewMode } from "@/components/CharacterSheet";
import SpellSection from "./SpellSection";
import EditableSpellSection from "./EditableSpellSection";

interface CharacterBasicInfoProps {
  character: PlayerCharacter;
  setCharacter: Dispatch<SetStateAction<PlayerCharacter | undefined>>;
  isEditable: boolean;
  viewMode?: CharacterSheetViewMode;
}

const CharacterOtherInfo = ({
  character,
  setCharacter,
  isEditable,
  viewMode = CharacterSheetViewMode.ViewOnly,
}: CharacterBasicInfoProps) => {
  const updateCoin = (newCoin: number) => {
    const newCharacter = new PlayerCharacter(
      undefined,
      undefined,
      undefined,
      character,
    );
    newCharacter.coin = newCoin;
    setCharacter(newCharacter);
  };
  const isOwner = viewMode === CharacterSheetViewMode.Owner;
  return (
    <div className="pb-4 border-b-2 md:border-0 border-teal-200 dark:border-teal-800">
      <div className="grid grid-cols-2 p-4">
        <LargeField label="Speeds">
          {character.speeds.map((speed) => {
            return (
              <li key={speed.speed + speed.type}>
                {speed.speed} ft.{" "}
                <span className="font-thin">{speed.type}</span>
              </li>
            );
          })}
        </LargeField>
        <LargeField label="Size">
          <span className="capitalize">{character.size.toLowerCase()}</span>
        </LargeField>
      </div>
      {character?.characterClass?.extra?.forms && (
        <EditableShifterFormDisplay
          character={character}
          setCharacter={setCharacter}
          isEditable={isEditable}
        />
      )}
      {character?.characterClass?.extra?.beastMasterPet && (
        <EditableBeastmasterBeastsDisplay
          character={character}
          setCharacter={setCharacter}
          isEditable={isEditable}
        />
      )}
      {character?.spells &&
        character?.possibleSpells &&
        character.possibleSpells.length > 0 &&
        (isOwner && isEditable ? (
          <EditableSpellSection
            character={character}
            setCharacter={setCharacter}
          />
        ) : (
          character.spells.length > 0 && (
            <SpellSection spells={character.spells} />
          )
        ))}
      <div className="bg-teal-100 dark:bg-teal-950 border-y-2 border-teal-200 dark:border-teal-800">
        <CharacterItems
          character={character}
          setCharacter={setCharacter}
          isEditable={isEditable}
          viewItemsOnly={!isOwner}
        />
        <div className="flex justify-end items-end h-full">
          <SmallField label="Coin">
            {isOwner ? (
              <NumInput
                defaultValue={character.coin}
                onChange={(e) => updateCoin(Number(e.target.value))}
                size={String(character.coin).length}
              />
            ) : (
              <p>{character.coin}</p>
            )}
          </SmallField>
        </div>
      </div>
    </div>
  );
};

export default CharacterOtherInfo;
