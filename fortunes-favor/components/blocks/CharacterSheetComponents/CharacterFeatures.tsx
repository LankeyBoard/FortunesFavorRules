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
  const [showGenericFeaturesModal, setShowGenericFeaturesModal] =
    useState(false);
  return (
    <div>
      <h2 className="font-thin text-xl mx-auto text-center pb-0 tracking-widest md:pt-6">
        {label}
      </h2>
      {characterOptions && isEditable && (
        <>
          <div className="mx-auto">
            <button
              type="button"
              className="w-fit px-2 py-0 mb-2 border-b-2 border-amber-300 dark:border-amber-700 text-gray-700 dark:text-gray-300 hover:text-black hover:dark:text-white hover:border-amber-500 mr-auto ml-2 block float-left"
              onClick={() => {
                setShowGenericFeaturesModal(true);
              }}
            >
              <span>Pick Novice/Veteran Features</span>
            </button>
          </div>
          {showGenericFeaturesModal && (
            <div className="w-fit md:fixed mx-auto md:my-30 dark:bg-slate-800 md:inset-0 bg-opacity-50 backdrop-blur-sm max-w-4xl overflow-auto md:mt-28 p-4">
              <button
                type="button"
                onClick={() => setShowGenericFeaturesModal(false)}
                className="float-right"
              >
                <span className="w-6 h-6">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-slate-900 stroke-slate-900 dark:fill-slate-100 dark:stroke-slate-100 w-6 h-6"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path d="M9.70711 8.29289C9.31658 7.90237 8.68342 7.90237 8.29289 8.29289C7.90237 8.68342 7.90237 9.31658 8.29289 9.70711L10.5858 12L8.29289 14.2929C7.90237 14.6834 7.90237 15.3166 8.29289 15.7071C8.68342 16.0976 9.31658 16.0976 9.70711 15.7071L12 13.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13.4142 12L15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L12 10.5858L9.70711 8.29289Z"></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z"
                      ></path>{" "}
                    </g>
                  </svg>
                </span>
              </button>
              <GenericFeaturePicker
                character={character}
                setCharacter={setCharacter}
                genericFeatures={characterOptions.genericFeatures}
              />
            </div>
          )}
        </>
      )}
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
              {areExpanded ? (
                <span>Contract All</span>
              ) : (
                <span>Expand All</span>
              )}
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
