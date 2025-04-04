import PlayerCharacter from "@/utils/PlayerCharacter";
import React, { Dispatch, SetStateAction } from "react";
import NumInput from "../Inputs/NumInput";
import SmallField from "../SmallField";
import LargeField from "../LargeField";
import CharacterItems from "./CharacterItems";
import CharacterFeatures from "./CharacterFeatures";

interface CharacterBasicInfoProps {
  character: PlayerCharacter;
  setCharacter: Dispatch<SetStateAction<PlayerCharacter | undefined>>;
  isEditable: boolean;
}

const CharacterOtherInfo = ({
  character,
  setCharacter,
  isEditable,
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

  return (
    <div className="pb-4 border-b-2 md:border-0 border-teal-200 dark:border-teal-800">
      <div className="p-4">
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
      <div className="bg-teal-100 dark:bg-teal-950 border-y-2 border-teal-200 dark:border-teal-800">
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
      <div className="pt-4 md:pt-0">
        <CharacterFeatures
          character={character}
          setCharacter={setCharacter}
          features={character.actions}
          isEditable={isEditable}
          label="Actions"
        />
      </div>
      <div>
        <CharacterFeatures
          character={character}
          setCharacter={setCharacter}
          features={character.counters}
          isEditable={isEditable}
          label="Counters"
        />
      </div>
    </div>
  );
};

export default CharacterOtherInfo;
