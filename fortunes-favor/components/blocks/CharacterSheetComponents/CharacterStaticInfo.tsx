import PlayerCharacter from "@/utils/PlayerCharacter";
import React, { Dispatch, SetStateAction } from "react";
import NumInput from "../Inputs/NumInput";
import SmallField from "../SmallField";
import LockableSmallTextInput from "../Inputs/LockableSmallTextInput";
import DropdownField from "../Inputs/DropdownField";
import { CharacterOptions } from "../../CharacterSheet";
import VerticalLabeledBox from "../VerticalLabeledBox";
import LargeField from "../LargeField";
import CharacterItems from "./CharacterItems";

interface CharacterBasicInfoProps {
  character: PlayerCharacter;
  setCharacter: Dispatch<SetStateAction<PlayerCharacter | undefined>>;
  isEditable: boolean;
  characterOptions: CharacterOptions;
}

const CharacterStaticInfo = ({
  character,
  setCharacter,
  isEditable,
  characterOptions,
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
  const updateLevel = (newLevel: number) => {
    const newCharacter = new PlayerCharacter(
      undefined,
      undefined,
      undefined,
      character,
    );
    newCharacter.level = newLevel;
    setCharacter(newCharacter);
  };
  return (
    <div className="">
      <div className="">
        <VerticalLabeledBox label="Basics">
          <div className="flex flex-wrap gap-x-2">
            <LockableSmallTextInput
              isEditable={isEditable}
              label="level"
              value={character.level}
              updateFunc={(e) => updateLevel(Number(e.target.value))}
            />
            {isEditable ? (
              <DropdownField
                name="Class"
                options={characterOptions.characterClasses}
                defaultValue={character.characterClass.slug}
                unselectedOption={!character.characterClass}
                onChange={(e) => {
                  const slug = e.target.value;
                  const updatedCharacterClass =
                    characterOptions.characterClasses.find(
                      (c) => c.slug === slug,
                    );
                  if (updatedCharacterClass) {
                    const updatedCharacter = new PlayerCharacter(
                      undefined,
                      undefined,
                      undefined,
                      character,
                    );
                    updatedCharacter.characterClass = updatedCharacterClass;
                    setCharacter(updatedCharacter);
                  }
                }}
              />
            ) : (
              <SmallField label="Class">
                {character.characterClass.title}
              </SmallField>
            )}
            {isEditable ? (
              <DropdownField
                name="Culture"
                options={characterOptions.characterCultures}
                unselectedOption={!character.culture}
                defaultValue={character.culture.slug}
                onChange={(e) => {
                  const slug = e.target.value;
                  const updatedCharacterCulture =
                    characterOptions.characterCultures.find(
                      (c) => c.slug === slug,
                    );
                  if (updatedCharacterCulture) {
                    const updatedCharacter = new PlayerCharacter(
                      undefined,
                      undefined,
                      undefined,
                      character,
                    );
                    updatedCharacter.culture = updatedCharacterCulture;
                    setCharacter(updatedCharacter);
                  }
                }}
              />
            ) : (
              <SmallField label="Culture">{character.culture.title}</SmallField>
            )}
            {isEditable ? (
              <DropdownField
                name="Lineage"
                options={characterOptions.characterLineages}
                unselectedOption={!character.lineage}
                defaultValue={character.lineage.slug}
                onChange={(e) => {
                  const slug = e.target.value;
                  const updatedCharacterLineage =
                    characterOptions.characterLineages.find(
                      (c) => c.slug === slug,
                    );
                  if (updatedCharacterLineage) {
                    const updatedCharacter = new PlayerCharacter(
                      undefined,
                      undefined,
                      undefined,
                      character,
                    );
                    updatedCharacter.lineage = updatedCharacterLineage;
                    setCharacter(updatedCharacter);
                  }
                }}
              />
            ) : (
              <SmallField label="Lineage">{character.lineage.title}</SmallField>
            )}
          </div>
        </VerticalLabeledBox>
      </div>
      <div className="bg-teal-100 dark:bg-teal-950 p-4">
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
      </div>
      <CharacterItems
        character={character}
        setCharacter={setCharacter}
        isEditable={isEditable}
      />
      <div className="flex justify-end items-end h-full">
        <SmallField label="Coin">
          <NumInput
            defaultValue={character.coin}
            onChange={(e) => updateCoin(Number(e.target.value))}
            size={String(character.coin).length}
          />
        </SmallField>
      </div>
    </div>
  );
};

export default CharacterStaticInfo;
