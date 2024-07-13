"use client";
import { useState } from "react";
import PlayerCharacter from "../utils/PlayerCharacter";
import InputField, { DropdownField } from "./blocks/InputField";
import CharacterCulture from "../utils/CharacterCulture";
import CharacterLineage from "../utils/CharacterLineage";
import CharacterClass from "../utils/CharacterClass";
import { FeatureCard } from "./blocks/FeatureCard";
type CharacterSheetProps = {
  currentCharacter?: PlayerCharacter;
  characterOptions?: any;
};

enum armorTypes {
  none = "none",
  light = "light",
  medium = "medium",
  heavy = "heavy",
}

const calculateArmor = (armorType: string, baseStat: number) => {
  switch (armorType) {
    case armorTypes.light:
      return 12 + baseStat;
    case armorTypes.medium:
      return 14 + Math.min(2, baseStat);
    case armorTypes.heavy:
      return 17;
    default:
      return 10 + baseStat;
  }
};

const PlayerCharacterSheet = ({
  currentCharacter,
  characterOptions,
}: CharacterSheetProps) => {
  const [character, setCharacter] = useState(
    currentCharacter ? currentCharacter : new PlayerCharacter()
  );
  let cultures: CharacterCulture[] = [];
  let lineages: CharacterLineage[] = [];
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
  let armorOptions = [
    { title: "none" },
    { title: "light" },
    { title: "medium" },
    { title: "heavy" },
  ];
  return (
    <div id="character_sheet">
      <div className="md:flex md:flex-row">
        <div className="md:w-1/2">
          <h3 className="p-1 bg-teal-700 mb-3">Basic Info</h3>
          <div className="pl-3 pr-3 pb-2">
            <div className="flex flex-row">
              <InputField
                name="Character Name"
                isRequired={true}
                defaultValue={character.character_name}
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
                      character
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
                  console.log(e);
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
                        character
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
                    console.log(e);
                    const slug = e.target.value;
                    const updatedLineage = lineages.find(
                      (l) => l.slug === slug
                    );
                    if (updatedLineage) {
                      if (!character) {
                        const newCharacter = new PlayerCharacter(
                          undefined,
                          updatedLineage
                        );
                        setCharacter(newCharacter);
                      } else {
                        const updatedCharacter = new PlayerCharacter(
                          undefined,
                          undefined,
                          undefined,
                          character
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
                unselectedOption={!character.class}
                onChange={(e) => {
                  console.log(e);
                  const slug = e.target.value;
                  const updatedClass = characterClasses.find(
                    (c) => c.slug === slug
                  );
                  console.log("class found: ", updatedClass);
                  if (updatedClass) {
                    if (!character) {
                      const newCharacter = new PlayerCharacter(
                        undefined,
                        undefined,
                        updatedClass
                      );
                      setCharacter(newCharacter);
                    } else {
                      const updatedCharacter = new PlayerCharacter(
                        undefined,
                        undefined,
                        undefined,
                        character
                      );
                      updatedCharacter.class = updatedClass;
                      setCharacter(updatedCharacter);
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="md:w-1/2 md:bg-slate-800">
          <div id="stats" className="bg-slate-800 ">
            <h3 className="p-1 bg-teal-700 mb-3">Stats</h3>
            <div className="flex flex-row">
              <div className="ml-2 mr-2 w-10">
                <InputField
                  name="Mettle"
                  isRequired={true}
                  type="number"
                  defaultValue={character.stats.mettle}
                  onChange={(e) => {
                    console.log(e.target.value);
                    const updatedCharacter = new PlayerCharacter(
                      undefined,
                      undefined,
                      undefined,
                      character
                    );
                    updatedCharacter.stats = {
                      mettle: e.target.valueAsNumber,
                      agility: character.stats.agility,
                      heart: character.stats.heart,
                      intellect: character.stats.intellect,
                    };
                    setCharacter(updatedCharacter);
                    console.log(updatedCharacter);
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
                    console.log(e.target.value);
                    const updatedCharacter = new PlayerCharacter(
                      undefined,
                      undefined,
                      undefined,
                      character
                    );
                    updatedCharacter.stats = {
                      mettle: character.stats.mettle,
                      agility: e.target.valueAsNumber,
                      heart: character.stats.heart,
                      intellect: character.stats.intellect,
                    };
                    setCharacter(updatedCharacter);
                    console.log(updatedCharacter);
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
                    console.log(e.target.value);
                    const updatedCharacter = new PlayerCharacter(
                      undefined,
                      undefined,
                      undefined,
                      character
                    );
                    updatedCharacter.stats = {
                      mettle: character.stats.mettle,
                      agility: character.stats.agility,
                      heart: e.target.valueAsNumber,
                      intellect: character.stats.intellect,
                    };
                    console.log(updatedCharacter === character);
                    setCharacter(updatedCharacter);
                    console.log(updatedCharacter);
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
                    console.log(e.target.value);
                    const updatedCharacter = new PlayerCharacter(
                      undefined,
                      undefined,
                      undefined,
                      character
                    );
                    updatedCharacter.stats = {
                      mettle: character.stats.intellect,
                      agility: character.stats.agility,
                      heart: character.stats.heart,
                      intellect: e.target.valueAsNumber,
                    };
                    setCharacter(updatedCharacter);
                    console.log(updatedCharacter);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row">
            <div>
              <span className="font-light ml-2 mr-1">Max Health: </span>
              <span>{character.maxHealth}</span>
            </div>
            <div>
              <span className="font-light ml-2 mr-1">Max Stamina: </span>
              <span>{character.maxStamina}</span>
            </div>
          </div>
          <div className="m-2 flex flex-row">
            <h3 className="mr-3 mt-3">Select Armor: </h3>
            <DropdownField
              name=""
              options={armorOptions}
              unselectedOption={!character.class}
              onChange={(e) => {
                console.log(e);
                const updatedCharacter = new PlayerCharacter(
                  undefined,
                  undefined,
                  undefined,
                  character
                );

                updatedCharacter.armor = calculateArmor(
                  e.target.value,
                  character.stats.agility
                );
                setCharacter(updatedCharacter);
                console.log(updatedCharacter);
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row m-2">
        <div className="mr-2">Armor: {character.armor}</div>

        <div className="mr-2">Counter: {character.counter}</div>
        <div className="mr-2">
          Base Damage:{" "}
          {character.baseDamage ? (
            <span>
              {character.baseDamage.count}d{character.baseDamage?.dice} +{" "}
              {character.baseDamage?.stat}
            </span>
          ) : (
            <span>Select a Class</span>
          )}
        </div>
      </div>
      <div className="p-1 bg-slate-700 mb-2 flex flex-row">
        <h3 className="mr-2 font-semibold">Speeds: </h3>
        <div className="">
          {character.speeds?.map((s) => {
            return (
              <span key={s.type} className="capitalize">
                {s.type}: <span className="font-light">{s.speed}ft.</span>
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row mr-1 ml-1">
        <h3 className="mr-2 font-semibold">Range</h3>
        <div className="mr-2">
          <span>Min: </span>
          <span className="font-light">
            {character.range?.min === 0 ? "Melee" : character.range?.min}
          </span>
        </div>
        <div>
          <span>Max: </span>
          <span className="font-light">
            {character.range?.max === 0 ? "Melee" : character.range?.max}
          </span>
        </div>
      </div>

      <div className="ml-2 mr-2 w-10 mt-3">
        <InputField
          name="Coin"
          isRequired={true}
          type="number"
          defaultValue={character.coin}
        />
      </div>
      <div>
        <h3 className="p-1 bg-purple-900 mb-3">Actions</h3>
        {character.counters && character.counters?.length > 0 ? (
          character.actions?.map((action) => {
            const f = {
              ...action,
              slug: action.title,
            };
            return (
              <FeatureCard
                key={action.title}
                feature={action}
                source={action.source.toString()}
              />
            );
          })
        ) : (
          <span>&#8212;</span>
        )}
      </div>
      <div>
        <h3 className="p-1 bg-purple-900 mb-3">Counters</h3>
        {character.counters && character.counters?.length > 0 ? (
          character.counters?.map((counter) => {
            return <div key={counter.title}>{counter.title}</div>;
          })
        ) : (
          <span>&#8212;</span>
        )}
      </div>
      <div>
        <h3 className="p-1 bg-purple-900 mb-3">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {character.features && character.features?.length > 0 ? (
            character.features?.map((feature) => {
              return (
                <div key={feature.title} className="">
                  <FeatureCard
                    key={feature.title}
                    feature={feature}
                    source={feature.source.toString()}
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
        <h3 className="p-1 bg-purple-900 mb-3">Items</h3>
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
    </div>
  );
};

export default PlayerCharacterSheet;
