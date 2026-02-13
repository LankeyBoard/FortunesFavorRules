"use client";

import { Spell } from "@/utils/graphQLQueries/AllSpellsQuery";
import SpellCard from "../SpellCard";
import { useState } from "react";
import Button, { ButtonType } from "../Inputs/Button";

const SpellSection = ({ spells }: { spells: Spell[] }) => {
  const [showSpells, setShowSpells] = useState(true);

  return (
    <div>
      <h2 className="font-thin text-xl mx-auto text-center pb-0 tracking-widest md:pt-6 mb-2">
        Spells
      </h2>
      {showSpells &&
        spells.map((spell, i) => {
          return <SpellCard spell={spell} key={i} />;
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
export default SpellSection;
