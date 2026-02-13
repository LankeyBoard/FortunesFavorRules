"use client";

import { Spell } from "@/utils/graphQLQueries/AllSpellsQuery";
import SpellCard from "../SpellCard";
import { useState } from "react";
import Button, { ButtonType } from "../Inputs/Button";

const SpellSection = ({ spells }: { spells: Spell[] }) => {
  const [areSpellsExpanded, setAreSpellsExpanded] = useState(false);

  return (
    <div>
      <h2 className="font-thin text-xl mx-auto text-center pb-0 tracking-widest md:pt-6 mb-2">
        Spells
      </h2>
      <div className="flex flex-row-reverse gap-2">
        {spells.length > 0 && (
          <Button
            buttonType={ButtonType.simple}
            color="amber"
            onClick={() => {
              setAreSpellsExpanded(!areSpellsExpanded);
            }}
          >
            {areSpellsExpanded ? (
              <span>Contract All</span>
            ) : (
              <span>Expand All</span>
            )}
          </Button>
        )}
      </div>
      {spells.map((spell) => {
        return (
          <SpellCard
            spell={spell}
            key={spell.name}
            isExpanded={areSpellsExpanded}
          />
        );
      })}
    </div>
  );
};
export default SpellSection;
