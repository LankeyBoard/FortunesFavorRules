import PlayerCharacter from "@/utils/PlayerCharacter";
import React from "react";
import TextBlock from "./TextBlock";

const SmallField = ({ text, label }: { text: string; label: string }) => {
  return (
    <div className="grid grid-cols-1 text-center m-2">
      <span className="text-lg font-light">{text}</span>
      <span className="text-xs tracking-tighter opacity-80">{label}</span>
    </div>
  );
};

const SpeedDisplay = ({ speeds }: { speeds: PlayerCharacter["speeds"] }) => {
  return (
    <div>
      <h3 className="text-lg">Speeds</h3>
      <ul className="px-4">
        {speeds.map((speed) => {
          return (
            <li key={speed.source + speed.type}>
              {speed.speed} ft. <span className="font-thin">{speed.type}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

interface CharacterBasicInfoProps {
  character: PlayerCharacter;
}

const CharacterStaticInfo = ({ character }: CharacterBasicInfoProps) => {
  console.log("Character: ", character.features);
  return (
    <div className="p-4">
      <div>
        <h2 className="font-thin text-xl mx-auto text-center">
          {character.name}
        </h2>
        <div className="">
          <SmallField text={character.level.toString()} label="Level" />
          <SmallField text={character.characterClass.title} label="Class" />
          <SmallField text={character.culture.title} label="Culture" />
          <SmallField text={character.lineage.title} label="Lineage" />
        </div>
      </div>
      <SpeedDisplay speeds={character.speeds} />
      <div>
        <div>{character.coin} Coin</div>
        <div>Items</div>
        {character.items && character.items.length > 0 ? (
          character.items.map((item) => (
            <div key={item.title}>
              <h4>{item.title}</h4>
              <TextBlock text={item.text} />
            </div>
          ))
        ) : (
          <div>No items</div>
        )}
      </div>
    </div>
  );
};

export default CharacterStaticInfo;
