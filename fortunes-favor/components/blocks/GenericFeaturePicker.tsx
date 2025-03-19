import PlayerCharacter, {
  PlayerCharacterFeature,
} from "@/utils/PlayerCharacter";
import FeatureCard from "./FeatureCard";
import { Dispatch, SetStateAction } from "react";
import SelectableFeatureCard from "./SelectableFeatureCard";

export type GenericCharacterFeatures = {
  noviceFeatures: PlayerCharacterFeature[];
  veteranFeatures: PlayerCharacterFeature[];
};

const FeatureSection = ({
  genericFeatures,
  label,
  character,
  setCharacter,
}: {
  genericFeatures: PlayerCharacterFeature[];
  label: string;
  character: PlayerCharacter;
  setCharacter: Dispatch<SetStateAction<PlayerCharacter | undefined>>;
}) => {
  return (
    <div>
      <h2 className="font-thin text-xl mx-auto text-center pb-2 tracking-widest md:pt-6">
        {label}
      </h2>
      <div className="md:grid md:grid-cols-3 gap-2">
        {genericFeatures.map((feature) => {
          return (
            <SelectableFeatureCard
              key={feature.slug}
              feature={feature}
              character={character}
              setCharacter={setCharacter}
            />
          );
        })}
      </div>
    </div>
  );
};

const GenericFeaturePicker = ({
  genericFeatures,
  character,
  setCharacter,
}: {
  genericFeatures: GenericCharacterFeatures;
  character: PlayerCharacter;
  setCharacter: Dispatch<SetStateAction<PlayerCharacter | undefined>>;
}) => {
  return (
    <>
      <FeatureSection
        label="Novice Features"
        genericFeatures={genericFeatures.noviceFeatures}
        character={character}
        setCharacter={setCharacter}
      />
      {character.level >= 8 && (
        <FeatureSection
          label="Veteran Features"
          genericFeatures={genericFeatures.veteranFeatures}
          character={character}
          setCharacter={setCharacter}
        />
      )}
    </>
  );
};

export default GenericFeaturePicker;
