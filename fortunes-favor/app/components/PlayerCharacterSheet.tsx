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
    <div>
      Player Character
      <div className="">
        <div className="flex flex-row">
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
          <InputField
            name="Character Name"
            isRequired={true}
            defaultValue={character.character_name}
          />
        </div>
        <div className="flex flex-row">
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

          <DropdownField
            name="lineage"
            options={lineages}
            unselectedOption={!character.lineage}
            onChange={(e) => {
              console.log(e);
              const slug = e.target.value;
              const updatedLineage = lineages.find((l) => l.slug === slug);
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
      <div>
        Stats
        <div className="flex flex-row">
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
      <div className="flex flex-row">
        <span>Max Stamina: </span>
        <span>{character.maxStamina}</span>
      </div>
      <div className="flex flex-row">
        <span>Max Health: </span>
        <span>{character.maxHealth}</span>
      </div>
      <div className="flex flex-row">
        <div>
          <DropdownField
            name="Armor"
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
          <span>{character.armor}</span>
        </div>

        <div>Counter: {character.counter}</div>
        <div>
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
      <div>
        <span>Speed</span>
        <div className="flex flex-row">
          {character.speeds?.map((s) => {
            return (
              <span key={s.type} className="capitalize">
                {s.type}: {s.speed}ft.
              </span>
            );
          })}
        </div>
      </div>
      <div>
        <span>Range</span>
        <div className="flex flex-row">
          <div className="mr-2">
            <span>Min: </span>
            <span>
              {character.range?.min === 0 ? "Melee" : character.range?.min}
            </span>
          </div>
          <div>
            <span>Max: </span>
            <span>{character.range?.max}</span>
          </div>
        </div>
      </div>
      <div>
        <span>Items</span>
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
        <InputField
          name="Coin"
          isRequired={true}
          type="number"
          defaultValue={character.coin}
        />
      </div>
      <div>
        <span>Actions</span>
        {character.actions?.map((action) => {
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
        })}
      </div>
      <div>
        <span>Counters</span>
        {character.counters?.map((counter) => {
          return <div key={counter.title}>{counter.title}</div>;
        })}
      </div>
      <div>
        Features
        {character.features?.map((feature) => {
          return (
            <FeatureCard
              key={feature.title}
              feature={feature}
              source={feature.source.toString()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PlayerCharacterSheet;
