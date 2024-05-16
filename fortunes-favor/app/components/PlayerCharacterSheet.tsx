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
            name="cultures"
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
            name="lineages"
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
            name="classes"
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
              console.log("max stamina: ", updatedCharacter.maxStamina);
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
        <InputField
          name="Armor"
          isRequired={true}
          defaultValue={character.armor}
        />
        <InputField
          name="Counter"
          isRequired={true}
          defaultValue={character.counter}
        />
        <InputField
          name="Base Damage"
          isRequired={true}
          defaultValue={character.baseDamage}
        />
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
