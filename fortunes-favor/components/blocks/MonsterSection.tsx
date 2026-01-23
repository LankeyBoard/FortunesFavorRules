"use client";
import { useState } from "react";
import Chevron from "../icons/Chevron";
import Button, { ButtonType } from "./Inputs/Button";
import TextBlock from "./TextBlock";
import {
  Monster,
  MonsterGroup,
} from "@/utils/graphQLQueries/monsters/AllMonstersQuery";
import MonsterCard from "./MonsterCard";
import ImgDisplay from "./ImgDisplay";
type MonsterSectionProps = {
  monsterGroup: MonsterGroup | Monster[];
};
const MonsterSection: React.FC<MonsterSectionProps> = ({ monsterGroup }) => {
  const [showMonsters, setShowMonsters] = useState(true);
  if ("name" in monsterGroup) {
    return (
      <div className="mt-4 flex flex-wrap scroll-mt-22" id={monsterGroup.name}>
        <div className="w-full h-fit bg-teal-100 dark:bg-teal-900 text-xl p-2 font-light border-t-2 border-teal-500 flex justify-between items-center">
          <h1>{monsterGroup.name}</h1>
          <Button
            className="pr-2"
            buttonType={ButtonType.icon}
            onClick={() => setShowMonsters((showMonsters) => !showMonsters)}
          >
            {showMonsters ? <Chevron /> : <Chevron className="rotate-180" />}
          </Button>
        </div>

        {monsterGroup.img ? (
          <div className="flex flex-row">
            <TextBlock
              style="block px-4 italic w-1/2"
              text={monsterGroup.description}
            />
            <ImgDisplay className="w-1/2 p-4" img={monsterGroup.img} />
          </div>
        ) : (
          <TextBlock
            style="block px-4 italic w-full md:w-1/2"
            text={monsterGroup.description}
          />
        )}
        {showMonsters && (
          <div className="p-4 clear-both w-full flex flex-wrap">
            {monsterGroup.monsters.map((m) => (
              <MonsterCard key={m.name} monster={m} />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="mt-4 flex flex-wrap scroll-mt-22 border-t-2 border-teal-500">
        <div className="m-4 clear-both w-full flex flex-wrap">
          {monsterGroup.map((m) => (
            <MonsterCard key={m.name} monster={m} />
          ))}
        </div>
      </div>
    );
  }
};

export default MonsterSection;
