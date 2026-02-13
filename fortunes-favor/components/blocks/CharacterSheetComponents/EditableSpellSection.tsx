"use client";

import { Spell } from "@/utils/graphQLQueries/AllSpellsQuery";
import SpellCard from "../SpellCard";
import { Dispatch, SetStateAction, useState } from "react";
import Button, { ButtonType } from "../Inputs/Button";
import PlayerCharacter from "@/utils/PlayerCharacter";
import SpellSection from "./SpellSection";

const EditableSpellSection = ({
  character,
  setCharacter,
}: {
  character: PlayerCharacter;
  setCharacter: Dispatch<SetStateAction<PlayerCharacter | undefined>>;
}) => {
  const possibleSpells = character.possibleSpells.filter(
    (s) => !character.spells.includes(s),
  );
  const [showSpells, setShowSpells] = useState(true);

  return (
    <div>
      <h2 className="font-thin text-xl mx-auto text-center pb-0 tracking-widest md:pt-6 mb-2">
        Known Spells
      </h2>
      {showSpells &&
        character.spells.map((spell, i) => {
          return (
            <div
              key={i}
              className="hover:scale-110 cursor-pointer"
              onClick={() => {
                console.log(spell.name);
                let updatedCharacterSpells = [...character.spells];
                let i = updatedCharacterSpells.findIndex(
                  (s) => s.name === spell.name,
                );
                if (i !== -1) updatedCharacterSpells.splice(i, 1);
                else updatedCharacterSpells.push(spell);
                let updatedCharacter = new PlayerCharacter(
                  undefined,
                  undefined,
                  undefined,
                  character,
                );
                updatedCharacter.spells = updatedCharacterSpells;
                setCharacter(updatedCharacter);
              }}
              id={spell.name}
            >
              <SpellCard spell={spell} />
            </div>
          );
        })}
      <h2 className="font-thin text-xl mx-auto text-center pb-0 tracking-widest md:pt-6 mb-2">
        Possible Spells
      </h2>
      {showSpells &&
        possibleSpells.map((spell, i) => {
          return (
            <div
              key={i}
              className="hover:scale-110 cursor-pointer"
              onClick={() => {
                console.log(spell.name);
                let updatedCharacterSpells = [...character.spells];
                let i = updatedCharacterSpells.findIndex(
                  (s) => s.name === spell.name,
                );
                if (i !== -1) updatedCharacterSpells.splice(i, 1);
                else updatedCharacterSpells.push(spell);
                let updatedCharacter = new PlayerCharacter(
                  undefined,
                  undefined,
                  undefined,
                  character,
                );
                updatedCharacter.spells = updatedCharacterSpells;
                setCharacter(updatedCharacter);
              }}
              id={spell.name}
            >
              <SpellCard spell={spell} />
            </div>
          );
        })}
      <Button
        buttonType={ButtonType.simple}
        color="blue"
        className="mx-auto"
        onClick={() => setShowSpells(!showSpells)}
      >
        {showSpells ? <span>Hide Spells</span> : <span>Show Spells</span>}
      </Button>
    </div>
  );
};
export default EditableSpellSection;
