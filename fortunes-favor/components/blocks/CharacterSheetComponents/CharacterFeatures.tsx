"use client";
import PlayerCharacter, {
  PlayerCharacterFeature,
} from "@/utils/PlayerCharacter";
import FeatureCard from "../FeatureCard";
import { Dispatch, SetStateAction, useState } from "react";
import SlugLinker from "../SlugLinker";
import { CharacterOptions } from "@/components/CharacterSheet";
import GenericFeaturePicker from "../GenericFeaturePicker";

const LinkToBasicFeatures = ({ label }: { label: string }) => {
  switch (label.toLowerCase()) {
    case "actions":
      return (
        <div className="mx-auto text-center">
          <SlugLinker
            text={"[Basic Actions](/rules/player_rules#BASIC-ACTIONS)"}
          />
        </div>
      );
    case "counters":
      return (
        <div className="mx-auto text-center">
          <SlugLinker
            text={"[Basic Counters](/rules/player_rules#BASIC-COUNTERS)"}
          />
        </div>
      );
    default:
      return;
  }
};

const CharacterFeatures = ({
  character,
  setCharacter,
  features,
  isEditable,
  label,
  characterOptions,
}: {
  character: PlayerCharacter;
  setCharacter: Dispatch<SetStateAction<PlayerCharacter | undefined>>;
  features: PlayerCharacterFeature[] | undefined;
  isEditable: boolean;
  label: string;
  characterOptions?: CharacterOptions;
}) => {
  const [areExpanded, setExpanded] = useState(false);
  return (
    <div>
      <h2 className="font-thin text-xl mx-auto text-center pb-0 tracking-widest md:pt-6">
        {label}
      </h2>
      {features && features.length > 0 && (
        <>
          <div className="mx-auto">
            <button
              type="button"
              className="px-2 py-0 mb-2 border-b-2 border-amber-300 dark:border-amber-700 text-gray-700 dark:text-gray-300 hover:text-black hover:dark:text-white hover:border-amber-500 ml-auto mr-2 block"
              onClick={() => {
                setExpanded(!areExpanded);
              }}
            >
              {areExpanded ? <span>Hide All</span> : <span>Show All</span>}
            </button>
          </div>

          {features?.map((feature) => (
            <FeatureCard
              key={feature.slug}
              feature={feature}
              source={feature.source}
              character={character}
              setCharacter={setCharacter}
              isExpanded={areExpanded}
            />
          ))}
        </>
      )}
      <LinkToBasicFeatures label={label} />
    </div>
  );
};
export default CharacterFeatures;
