"use client";
import { useState } from "react";
import Chevron from "../icons/Chevron";
import Button, { ButtonType } from "./Inputs/Button";
import TextBlock from "./TextBlock";
import { MonsterGroup } from "@/utils/graphQLQueries/monsters/AllMonstersQuery";
import MonsterCard from "./MonsterCard";
type MonsterSectionProps = {
  monsterGroup: MonsterGroup;
};
const MonsterSection: React.FC<MonsterSectionProps> = ({ monsterGroup }) => {
  const [showMonsters, setShowMonsters] = useState(true);
  return (
    <div className="mt-4 flex flex-wrap scroll-mt-22" id={monsterGroup.name}>
      <div className="w-full h-fit bg-teal-100 dark:bg-teal-900 text-xl p-2 font-light border-b-2 border-b-teal-500 flex justify-between items-center z-30">
        <h1>{monsterGroup.name}</h1>
        <Button
          className="pr-2"
          buttonType={ButtonType.icon}
          onClick={() => setShowMonsters((showMonsters) => !showMonsters)}
        >
          {showMonsters ? <Chevron /> : <Chevron className="rotate-180" />}
        </Button>
      </div>

      <TextBlock
        style="block px-4 italic w-full"
        text={monsterGroup.description}
      />
      {showMonsters && (
        <div className="m-4 clear-both w-full flex flex-wrap">
          {monsterGroup.monsters.map((m) => (
            <MonsterCard key={m.name} monster={m} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MonsterSection;
