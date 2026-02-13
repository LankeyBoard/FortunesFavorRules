"use client";

import { Spell } from "@/utils/graphQLQueries/AllSpellsQuery";
import SpellCard from "../SpellCard";
import { Dispatch, SetStateAction, useState } from "react";
import Button, { ButtonType } from "../Inputs/Button";
import PlayerCharacter from "@/utils/PlayerCharacter";

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

  const toggleSpell = (spell: Spell) => {
    let updatedCharacterSpells = [...character.spells];
    let i = updatedCharacterSpells.findIndex((s) => s.name === spell.name);
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
  };

  return (
    <div>
      <h2 className="font-thin text-xl mx-auto text-center pb-0 tracking-widest md:pt-6 mb-2">
        Known Spells
      </h2>

      {character.spells.map((spell) => {
        return (
          <div key={spell.name}>
            <div
              className="hover:scale-105 cursor-pointer"
              onClick={() => toggleSpell(spell)}
            >
              <SpellCard spell={spell} isExpanded={true} />
            </div>
          </div>
        );
      })}

      <h2 className="font-thin text-xl mx-auto text-center pb-0 tracking-widest md:pt-6 mb-2">
        Possible Spells
      </h2>

      {possibleSpells.map((spell) => {
        return (
          <div key={spell.name}>
            <div
              className="hover:scale-105 cursor-pointer"
              onClick={() => toggleSpell(spell)}
            >
              <SpellCard spell={spell} isExpanded={true} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default EditableSpellSection;
