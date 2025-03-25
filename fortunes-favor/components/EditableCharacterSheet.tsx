"use client";
import { useState } from "react";
import PlayerCharacter from "../utils/PlayerCharacter";
import InputField from "./blocks/Inputs/InputField";
import CharacterCulture from "../utils/CharacterCulture";
import CharacterLineage from "../utils/CharacterLineage";
import CharacterClass from "../utils/CharacterClass";
import { GenericFeature } from "../utils/graphQLtypes";
import { CharacterTrait } from "../utils/CharacterTrait";
import { useUser } from "./UserContext";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import DropdownField from "./blocks/Inputs/DropdownField";
import FeatureCard from "./blocks/FeatureCard";

const CREATE_CHARACTER_MUTATION = gql`
  mutation CreateCharacter($characterInputs: CharacterInput!) {
    createCharacter(input: $characterInputs) {
      name
      items {
        id
        title
      }
      level
      mettle
      agility
      heart
      intellect
      coin
      languages
      characterClass {
        title
      }
      characterLineage {
        title
      }
      characterCulture {
        title
      }
      currentHealth
      currentStamina
      maxHealth
      maxStamina
      armorName
      shieldName
      counter
      baseDamage
      rangeMin
      rangeMax
      featureChoiceSlugs
    }
  }
`;

const convertPlayerCharacterToGraphInput = (character: PlayerCharacter) => {
  return {
    name: character.name,
    level: character.level,
    mettle: character.stats.mettle,
    agility: character.stats.agility,
    heart: character.stats.heart,
    intellect: character.stats.intellect,
    coin: character.coin,
    languages: character.languages,
    characterClass: character.characterClass?.slug || "",
    characterLineage: character.lineage?.slug || "",
    characterCulture: character.culture?.slug || "",
    maxHealth: character.maxHealth,
    maxStamina: character.maxStamina,
    armorName: character.armorName,
    shieldName: character.shieldName,
    counter: character.counter,
    baseDamage: character.baseDamage?.count || 0,
    rangeMin: character.range?.min || 0,
    rangeMax: character.range?.max || 0,
  };
};

type ArmorInfoProps = { currentCharacter?: PlayerCharacter };
const ArmorInfo = ({ currentCharacter }: ArmorInfoProps) => {
  if (!currentCharacter) return <></>;
  let txt = "";
  switch (currentCharacter.shieldName.toLowerCase()) {
    case "light":
      txt =
        "reduce clash damage taken by " +
        currentCharacter.stats.agility +
        " (Agility)";
      break;
    case "medium":
      txt = "reduce clash damage taken by 2";
      break;
    case "heavy":
      txt =
        "reduce clash damage taken by " +
        currentCharacter.stats.mettle +
        " (Mettle)";
      break;
    default:
      return;
  }
  return (
    <p>
      <span className="font-light">Shield Effect: </span>
      {txt}
    </p>
  );
};

type CharacterSheetProps = {
  currentCharacter?: PlayerCharacter;
  characterOptions?: any;
};

const EditableCharacterSheet = ({
  currentCharacter,
  characterOptions,
}: CharacterSheetProps) => {
  const [character, setCharacter] = useState(
    currentCharacter ? currentCharacter : new PlayerCharacter(),
  );
  let cultures: CharacterCulture[] = [];
  let lineages: CharacterLineage[] = [];
  let noviceFeatures: GenericFeature[] = [];
  let veteranFeatures: GenericFeature[] = [];
  let characterClasses: CharacterClass[] = [];
  if (characterOptions.cultures) {
    characterOptions.cultures.forEach((culture: any) => {
      cultures.push(new CharacterCulture(culture));
    });
  }
  if (characterOptions.lineages) {
    characterOptions.lineages.forEach((lineage: any) => {
      lineages.push(new CharacterLineage(lineage));
    });
  }
  if (characterOptions.characterClasses) {
    characterOptions.characterClasses.forEach((characterClass: any) => {
      characterClasses.push(new CharacterClass(characterClass));
    });
  }
  if (characterOptions.universalFeatures) {
    characterOptions.universalFeatures.forEach((feature: any) => {
      if (feature.featureType === "NOVICE")
        noviceFeatures.push(new CharacterTrait(feature));
      if (feature.featureType === "VETERAN")
        veteranFeatures.push(new CharacterTrait(feature));
    });
  }
  let armorOptions = [{ title: "None" }];
  const userContext = useUser();
  const [createCharacter, { data, loading, error }] = useMutation(
    CREATE_CHARACTER_MUTATION,
  );
  const saveCharacter = async () => {
    if (character.name === undefined || character.name === "") {
      alert("Character name is required");
      return;
    }

    const { data } = await createCharacter({
      variables: {
        characterInputs: convertPlayerCharacterToGraphInput(character),
      },
    });
    console.log("Character saved:", character);
  };

  return (
    <div id="character_sheet">
      <div className="md:flex md:flex-row">
        <div className="md:w-1/2">
          <h3 className="p-1 bg-teal-300 dark:bg-teal-700 mb-3">Basic Info</h3>
          <div className="pl-3 pr-3 pb-2">
            <div className="flex flex-row">
              <InputField
                name="Character Name"
                isRequired={true}
                defaultValue={character.name}
                onChange={(e) => {
                  const updatedCharacter = new PlayerCharacter(
                    undefined,
                    undefined,
                    undefined,
                    character,
                  );
                  updatedCharacter.name = e.target.value;
                  console.log(updatedCharacter.name);
                  setCharacter(updatedCharacter);
                }}
              />
              <div className="ml-2 mr-2 w-10">
                <InputField
                  name="Level"
                  isRequired={true}
                  type="number"
                  defaultValue={character.level}
                  onChange={(e) => {
                    const updatedCharacter = new PlayerCharacter(
                      undefined,
                      undefined,
                      undefined,
                      character,
                    );
                    updatedCharacter.level = e.target.valueAsNumber;
                    setCharacter(updatedCharacter);
                  }}
                />
              </div>
            </div>

            <div className="flex flex-wrap max-w-full" id="character_options">
              <DropdownField
                name="culture"
                options={cultures}
                unselectedOption={!character.culture}
                onChange={(e) => {
                  const slug = e.target.value;
                  const updatedCulture = cultures.find((c) => c.slug === slug);
                  if (updatedCulture) {
                    if (!character) {
                      const newCharacter = new PlayerCharacter(updatedCulture);
                      setCharacter(newCharacter);
                    } else {
                      const updatedCharacter = new PlayerCharacter(
                        undefined,
                        undefined,
                        undefined,
                        character,
                      );
                      updatedCharacter.culture = updatedCulture;
                      setCharacter(updatedCharacter);
                    }
                  }
                }}
              />
              <div className="ml-2 mr-2">
                <DropdownField
                  name="lineage"
                  options={lineages}
                  unselectedOption={!character.lineage}
                  onChange={(e) => {
                    const slug = e.target.value;
                    const updatedLineage = lineages.find(
                      (l) => l.slug === slug,
                    );
                    if (updatedLineage) {
                      if (!character) {
                        const newCharacter = new PlayerCharacter(
                          undefined,
                          updatedLineage,
                        );
                        setCharacter(newCharacter);
                      } else {
                        const updatedCharacter = new PlayerCharacter(
                          undefined,
                          undefined,
                          undefined,
                          character,
                        );
                        updatedCharacter.lineage = updatedLineage;
                        setCharacter(updatedCharacter);
                      }
                    }
                  }}
                />
              </div>

              <DropdownField
                name="class"
                options={characterClasses}
                unselectedOption={!character.characterClass}
                onChange={(e) => {
                  const slug = e.target.value;
                  const updatedClass = characterClasses.find(
                    (c) => c.slug === slug,
                  );
                  if (updatedClass) {
                    if (!character) {
                      const newCharacter = new PlayerCharacter(
                        undefined,
                        undefined,
                        updatedClass,
                      );
                      setCharacter(newCharacter);
                    } else {
                      const updatedCharacter = new PlayerCharacter(
                        undefined,
                        undefined,
                        undefined,
                        character,
                      );
                      updatedCharacter.characterClass = updatedClass;
                      setCharacter(updatedCharacter);
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="md:w-1/2 md:bg-slate-800">
          <div id="stats" className="bg-slate-200 dark:bg-slate-800 pb-2 ">
            <h3 className="p-1 bg-teal-300 dark:bg-teal-700 mb-3">Stats</h3>
            <div className="lg:flex flex-row">
              <div className="flex flex-row">
                <div className="ml-2 mr-2 w-10">
                  <InputField
                    name="Mettle"
                    isRequired={true}
                    type="number"
                    defaultValue={character.stats.mettle}
                    onChange={(e) => {
                      const updatedCharacter = new PlayerCharacter(
                        undefined,
                        undefined,
                        undefined,
                        character,
                      );
                      updatedCharacter.stats = {
                        mettle: e.target.valueAsNumber,
                        agility: character.stats.agility,
                        heart: character.stats.heart,
                        intellect: character.stats.intellect,
                      };
                      setCharacter(updatedCharacter);
                    }}
                  />
                </div>
                <div className="ml-2 mr-2 w-10">
                  <InputField
                    name="Agility"
                    isRequired={true}
                    type="number"
                    defaultValue={character.stats.agility}
                    onChange={(e) => {
                      const updatedCharacter = new PlayerCharacter(
                        undefined,
                        undefined,
                        undefined,
                        character,
                      );
                      updatedCharacter.stats = {
                        mettle: character.stats.mettle,
                        agility: e.target.valueAsNumber,
                        heart: character.stats.heart,
                        intellect: character.stats.intellect,
                      };
                      setCharacter(updatedCharacter);
                    }}
                  />
                </div>
                <div className="ml-2 mr-2 w-10">
                  <InputField
                    name="Heart"
                    isRequired={true}
                    type="number"
                    defaultValue={character.stats.heart}
                    onChange={(e) => {
                      const updatedCharacter = new PlayerCharacter(
                        undefined,
                        undefined,
                        undefined,
                        character,
                      );
                      updatedCharacter.stats = {
                        mettle: character.stats.mettle,
                        agility: character.stats.agility,
                        heart: e.target.valueAsNumber,
                        intellect: character.stats.intellect,
                      };
                      setCharacter(updatedCharacter);
                    }}
                  />
                </div>
                <div className="ml-2 mr-2 w-10">
                  <InputField
                    name="Intellect"
                    isRequired={true}
                    type="number"
                    defaultValue={character.stats.intellect}
                    onChange={(e) => {
                      const updatedCharacter = new PlayerCharacter(
                        undefined,
                        undefined,
                        undefined,
                        character,
                      );
                      updatedCharacter.stats = {
                        mettle: character.stats.mettle,
                        agility: character.stats.agility,
                        heart: character.stats.heart,
                        intellect: e.target.valueAsNumber,
                      };
                      setCharacter(updatedCharacter);
                    }}
                  />
                </div>
              </div>

              <div className="font-light text-slate-700 dark:text-slate-300 ml-2">
                <p>Standard Stat Array [ 3, 2, 0, -2 ]</p>
                <p>
                  {character.culture && <>Culture: {character.culture?.stat}</>}
                </p>
                <p>
                  {character.lineage && <>Lineage: {character.lineage?.stat}</>}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="m-2 flex flex-row">
              <h3 className="mr-3 mt-4">Select Armor: </h3>
              <DropdownField
                name=""
                options={
                  character.characterClass?.training.armor
                    ? character.characterClass.training.armor
                    : armorOptions
                }
                unselectedOption={!character.characterClass}
                onChange={(e) => {
                  const updatedCharacter = new PlayerCharacter(
                    undefined,
                    undefined,
                    undefined,
                    character,
                  );

                  updatedCharacter.armorName = e.target.value;
                  setCharacter(updatedCharacter);
                }}
              />
            </div>
            <div className="m-2 flex flex-row">
              <h3 className="mr-3 mt-4">Select Shield: </h3>
              <DropdownField
                name=""
                options={
                  character.characterClass?.training.shields
                    ? character.characterClass.training.shields
                    : armorOptions
                }
                unselectedOption={!character.characterClass}
                onChange={(e) => {
                  const updatedCharacter = new PlayerCharacter(
                    undefined,
                    undefined,
                    undefined,
                    character,
                  );

                  updatedCharacter.shieldName = e.target.value;
                  setCharacter(updatedCharacter);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="border-l-2 border-l-amber-500 p-2">
          <div className="flex flex-col">
            <div className="flex-none">
              <span className="font-light ml-2 mr-1">Max Health: </span>
              <span>{character.maxHealth}</span>
            </div>
            <div className="flex-none">
              <span className="font-light ml-2 mr-1">Max Stamina: </span>
              <span>{character.maxStamina}</span>
            </div>
            <div className="ml-2 font-light flex-none">
              Armor:{" "}
              {character.armor > 0 ? (
                <span className="font-normal">{character.armor}</span>
              ) : (
                <span className="font-light">&#8212;</span>
              )}
            </div>

            <div className="ml-2 font-light flex-none">
              Counter:{" "}
              {character.counter && character.counter > 0 ? (
                <span className="font-normal">{character.counter}</span>
              ) : (
                <span className="font-light">&#8212;</span>
              )}
            </div>
            <div className="mx-2 font-light">
              Base Damage:{" "}
              {character.baseDamage ? (
                <span className="font-normal">
                  {character.baseDamage.count}d{character.baseDamage?.dice} +{" "}
                  {character.baseDamage?.stat}
                </span>
              ) : (
                <span className="font-light">&#8212;</span>
              )}
            </div>
            <div className="mx-2 flex-none">
              <ArmorInfo currentCharacter={character} />
            </div>
          </div>
        </div>
        <div className="p-1 pb-2 flex flex-col">
          <div className="flex flex-row mr-1">
            <h3 className="mr-2 font-semibold">Range</h3>
            <div className="mr-2">
              <span>Min: </span>
              <span className="font-light">
                {character.range?.min === 0
                  ? "Melee"
                  : character.range?.min + " ft."}
              </span>
            </div>
            <div>
              <span>Max: </span>
              <span className="font-light">
                {character.range?.max === 0
                  ? "Melee"
                  : character.range?.max + " ft."}
              </span>
            </div>
          </div>
          <div className="flex flex-row">
            <h3 className="mr-2 font-semibold">Speeds: </h3>
            {character.speeds?.map((s) => {
              return (
                <span key={s.type} className="capitalize mr-2">
                  {s.type}:{" "}
                  <span className="font-light normal-case">{s.speed} ft.</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
      {character.actions && character.actions?.length > 0 && (
        <div>
          <h3 className="p-1 bg-purple-300 dark:bg-purple-900 mb-3">Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {character.actions?.map((action) => {
              return (
                <FeatureCard
                  key={action.title}
                  feature={action}
                  source={action.source.toString()}
                  isExpanded={true}
                />
              );
            })}
          </div>
        </div>
      )}
      {character.counters && character.counters?.length > 0 && (
        <div>
          <h3 className="p-1 bg-purple-300 dark:bg-purple-900 mb-3">
            Counters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {character.counters?.map((counter) => {
              return <div key={counter.title}>{counter.title}</div>;
            })}
          </div>
        </div>
      )}
      <div>
        <h3 className="p-1 bg-purple-300 dark:bg-purple-900 mb-3">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {character.features && character.features?.length > 0 ? (
            character.features?.map((feature) => {
              return (
                <div key={feature.title} className="">
                  <FeatureCard
                    key={feature.title}
                    feature={feature}
                    source={feature.source.toString()}
                    isExpanded={true}
                  />
                </div>
              );
            })
          ) : (
            <span>&#8212;</span>
          )}
        </div>
      </div>
      <div>
        <h3 className="p-1 bg-purple-300 dark:bg-purple-900 mb-3">Items</h3>
        <div className="ml-2 mr-2 w-10 mt-3">
          <InputField
            name="Coin"
            isRequired={true}
            type="number"
            defaultValue={character.coin}
          />
        </div>
        <div>
          {character.items && character.items?.length > 0 ? (
            character.items?.map((item) => {
              return <span key={item.title}>{item.title}</span>;
            })
          ) : (
            <span>&#8212;</span>
          )}
        </div>
      </div>
      <div>
        <button
          onClick={saveCharacter}
          className={`mt-4 p-2 bg-blue-500 text-white rounded`}
        >
          Save Character
        </button>
      </div>
    </div>
  );
};

export default EditableCharacterSheet;
