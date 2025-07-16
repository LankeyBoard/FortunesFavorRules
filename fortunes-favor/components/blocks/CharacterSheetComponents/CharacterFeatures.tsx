"use client";
import PlayerCharacter, {
  PlayerCharacterFeature,
} from "@/utils/PlayerCharacter";
import FeatureCard from "../FeatureCard";
import { Dispatch, SetStateAction, useState } from "react";
import SlugLinker from "../SlugLinker";
import {
  CharacterOptions,
  CharacterSheetViewMode,
} from "@/components/CharacterSheet";
import GenericFeaturePicker from "../GenericFeaturePicker";
import Button, { ButtonType } from "../Inputs/Button";
import Close from "@/components/icons/Close";

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
  viewMode = CharacterSheetViewMode.ViewOnly,
}: {
  character: PlayerCharacter;
  setCharacter: Dispatch<SetStateAction<PlayerCharacter | undefined>>;
  features: PlayerCharacterFeature[] | undefined;
  isEditable: boolean;
  label: string;
  characterOptions?: CharacterOptions;
  viewMode?: CharacterSheetViewMode;
}) => {
  const [areExpanded, setExpanded] = useState(false);
  const [showGenericFeaturesModal, setShowGenericFeaturesModal] =
    useState(false);
  return (
    <>
      <div>
        <h2 className="font-thin text-xl mx-auto text-center pb-0 tracking-widest md:pt-6">
          {label}
        </h2>
        {characterOptions && isEditable && (
          <>
            <div className="mx-auto float-start">
              <Button
                buttonType={ButtonType.simple}
                color="amber"
                onClick={() => {
                  setShowGenericFeaturesModal(true);
                }}
              >
                <span>Pick Novice/Veteran Features</span>
              </Button>
            </div>
            {showGenericFeaturesModal && (
              <div className="float-left md:fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md z-99 rounded-md">
                <div className="w-fit md:fixed mx-auto md:my-30 bg-slate-200 dark:bg-slate-800 md:inset-0 backdrop-blur-sm max-w-4xl overflow-auto md:mt-28 p-4 ">
                  <button
                    type="button"
                    onClick={() => setShowGenericFeaturesModal(false)}
                    className="float-right fill-slate-900 stroke-slate-900 hover:fill-slate-600 hover:stroke-slate-600 dark:fill-slate-100 dark:stroke-slate-100 hover:dark:fill-slate-400 hover:dark:stroke-slate-400 cursor-pointer w-5"
                  >
                    <Close />
                  </button>
                  <GenericFeaturePicker
                    character={character}
                    setCharacter={setCharacter}
                    genericFeatures={characterOptions.genericFeatures}
                  />
                </div>
              </div>
            )}
          </>
        )}
        {features && features.length > 0 && (
          <>
            <div className="flex flex-row-reverse">
              <Button
                buttonType={ButtonType.simple}
                color="amber"
                onClick={() => {
                  setExpanded(!areExpanded);
                }}
              >
                {areExpanded ? (
                  <span>Contract All</span>
                ) : (
                  <span>Expand All</span>
                )}
              </Button>
            </div>

            {features?.map((feature) => (
              <FeatureCard
                key={feature.slug}
                feature={feature}
                source={feature.source}
                character={character}
                setCharacter={setCharacter}
                isExpanded={areExpanded}
                viewMode={viewMode}
              />
            ))}
          </>
        )}
        <LinkToBasicFeatures label={label} />
      </div>
    </>
  );
};
export default CharacterFeatures;
