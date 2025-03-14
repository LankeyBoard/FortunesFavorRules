import PlayerCharacter from "@/utils/PlayerCharacter";
import { FeatureCard } from "./FeatureCard";
import { Dispatch, SetStateAction } from "react";

const CharacterFeatures = ({
  character,
  setCharacter,
  isEditable,
}: {
  character: PlayerCharacter;
  setCharacter: Dispatch<SetStateAction<PlayerCharacter | undefined>>;
  isEditable: boolean;
}) => {
  return (
    <div>
      <h2 className="font-thin text-xl mx-auto text-center pb-6 tracking-widest md:pt-6">
        Features
      </h2>
      {character.features?.map((feature) => (
        <FeatureCard
          key={feature.slug}
          feature={feature}
          source={feature.source}
          character={character}
          setCharacter={setCharacter}
        />
      ))}
    </div>
  );
};
export default CharacterFeatures;
