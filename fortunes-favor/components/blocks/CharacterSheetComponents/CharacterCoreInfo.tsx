import PlayerCharacter, {
  ArmorType,
  ShieldType,
} from "@/utils/PlayerCharacter";
import React, { Dispatch, SetStateAction } from "react";
import NumInput from "../Inputs/NumInput";
import SmallField from "../SmallField";
import LockableSmallTextInput from "../Inputs/LockableSmallTextInput";
import VerticalLabeledBox from "../VerticalLabeledBox";
import Button, { ButtonType } from "../Inputs/Button";
import DropdownField from "../Inputs/DropdownField";
import { CharacterOptions } from "@/components/CharacterSheet";

const CombatStatDisplay = ({
  stat,
  label,
}: {
  stat: number | string;
  label: string;
}) => {
  return (
    <SmallField label={label}>
      <span className="text-xl font-light">{stat}</span>
    </SmallField>
  );
};

const ResourceDisplay = ({
  current,
  max,
  update,
  label,
}: {
  current: number;
  max: number;
  update: (newHealth: number) => void;
  label: string;
}) => {
  return (
    <div className="grid grid-cols-1 justify-items-center p-4">
      <p className="text-xs tracking-tighter opacity-80">{label}</p>
      <div>
        <span className="w-min text-xl align-text-bottom">
          <NumInput
            value={current}
            size={String(max).length}
            max={max}
            onChange={(e) => update(Number(e.target.value))}
          />
        </span>

        <span className="font-extralight"> / </span>
        <span className="font-extralight align-text-top">{max}</span>
      </div>
    </div>
  );
};

const CharacterCoreInfo = ({
  character,
  setCharacter,
  isEditable,
  characterOptions,
}: {
  character: PlayerCharacter;
  setCharacter: Dispatch<SetStateAction<PlayerCharacter | undefined>>;
  isEditable: boolean;
  characterOptions: CharacterOptions;
}) => {
  const updateCurrentHealth = (newHealth: number) => {
    const newCharacter = new PlayerCharacter(
      undefined,
      undefined,
      undefined,
      character,
    );
    newCharacter.currentHealth = newHealth;
    setCharacter(newCharacter);
  };
  const updateCurrentStamina = (newStamina: number) => {
    const newCharacter = new PlayerCharacter(
      undefined,
      undefined,
      undefined,
      character,
    );
    newCharacter.currentStamina = newStamina;
    setCharacter(newCharacter);
  };
  const updateMettle = (newMettle: number) => {
    const newCharacter = new PlayerCharacter(
      undefined,
      undefined,
      undefined,
      character,
    );
    newCharacter.stats.mettle = newMettle;
    setCharacter(newCharacter);
  };
  const updateAgility = (newAgility: number) => {
    const newCharacter = new PlayerCharacter(
      undefined,
      undefined,
      undefined,
      character,
    );
    newCharacter.stats.agility = newAgility;
    setCharacter(newCharacter);
  };

  const updateHeart = (newHeart: number) => {
    const newCharacter = new PlayerCharacter(
      undefined,
      undefined,
      undefined,
      character,
    );
    newCharacter.stats.heart = newHeart;
    setCharacter(newCharacter);
  };

  const updateIntellect = (newIntellect: number) => {
    const newCharacter = new PlayerCharacter(
      undefined,
      undefined,
      undefined,
      character,
    );
    newCharacter.stats.intellect = newIntellect;
    setCharacter(newCharacter);
  };

  const updateLevel = (newLevel: number) => {
    const newCharacter = new PlayerCharacter(
      undefined,
      undefined,
      undefined,
      character,
    );
    newCharacter.level = newLevel;
    setCharacter(newCharacter);
  };

  return (
    <div className="m-auto">
      <VerticalLabeledBox label="Basics">
        <div className="flex flex-wrap gap-x-2 justify-center">
          <LockableSmallTextInput
            isEditable={isEditable}
            label="level"
            value={character.level}
            updateFunc={(e) => updateLevel(Number(e.target.value))}
          />
          {isEditable ? (
            <DropdownField
              name="Class"
              options={characterOptions.characterClasses}
              defaultValue={character.characterClass.slug}
              unselectedOption={!character.characterClass}
              onChange={(e) => {
                const slug = e.target.value;
                const updatedCharacterClass =
                  characterOptions.characterClasses.find(
                    (c) => c.slug === slug,
                  );
                if (updatedCharacterClass) {
                  const updatedCharacter = new PlayerCharacter(
                    undefined,
                    undefined,
                    undefined,
                    character,
                  );
                  updatedCharacter.characterClass = updatedCharacterClass;
                  setCharacter(updatedCharacter);
                }
              }}
            />
          ) : (
            <SmallField label="Class">
              {character.characterClass.title}
            </SmallField>
          )}
          {isEditable ? (
            <DropdownField
              name="Culture"
              options={characterOptions.characterCultures}
              unselectedOption={!character.culture}
              defaultValue={character.culture.slug}
              onChange={(e) => {
                const slug = e.target.value;
                const updatedCharacterCulture =
                  characterOptions.characterCultures.find(
                    (c) => c.slug === slug,
                  );
                if (updatedCharacterCulture) {
                  const updatedCharacter = new PlayerCharacter(
                    undefined,
                    undefined,
                    undefined,
                    character,
                  );
                  updatedCharacter.culture = updatedCharacterCulture;
                  setCharacter(updatedCharacter);
                }
              }}
            />
          ) : (
            <SmallField label="Culture">{character.culture.title}</SmallField>
          )}
          {isEditable ? (
            <DropdownField
              name="Lineage"
              options={characterOptions.characterLineages}
              unselectedOption={!character.lineage}
              defaultValue={character.lineage.slug}
              onChange={(e) => {
                const slug = e.target.value;
                const updatedCharacterLineage =
                  characterOptions.characterLineages.find(
                    (c) => c.slug === slug,
                  );
                if (updatedCharacterLineage) {
                  const updatedCharacter = new PlayerCharacter(
                    undefined,
                    undefined,
                    undefined,
                    character,
                  );
                  updatedCharacter.lineage = updatedCharacterLineage;
                  setCharacter(updatedCharacter);
                }
              }}
            />
          ) : (
            <SmallField label="Lineage">{character.lineage.title}</SmallField>
          )}
        </div>
      </VerticalLabeledBox>
      <div className="bg-teal-100 dark:bg-teal-950 border-y-2 border-teal-200 dark:border-teal-800 pb-4">
        <VerticalLabeledBox label="stats">
          <div className="p-4 pb-0 flex flex-wrap md:grid md:grid-cols-4 gap-2 justify-center w-auto md:w-max mx-auto">
            <LockableSmallTextInput
              isEditable={isEditable}
              label="Mettle"
              value={character.stats.mettle}
              updateFunc={(e) => updateMettle(Number(e.target.value))}
            />
            <LockableSmallTextInput
              isEditable={isEditable}
              label="Agility"
              value={character.stats.agility}
              updateFunc={(e) => updateAgility(Number(e.target.value))}
            />
            <LockableSmallTextInput
              isEditable={isEditable}
              label="Heart"
              value={character.stats.heart}
              updateFunc={(e) => updateHeart(Number(e.target.value))}
            />
            <LockableSmallTextInput
              isEditable={isEditable}
              label="Intellect"
              value={character.stats.intellect}
              updateFunc={(e) => updateIntellect(Number(e.target.value))}
            />
          </div>
        </VerticalLabeledBox>
        {isEditable && (
          <>
            <p className="text-sm font-extralight mx-auto text-center">
              Starter Stats: 3, 2, 0, -2
            </p>
            <p className="text-sm font-extralight mx-auto text-center">
              {character.culture.title}: {character.culture.stat}
            </p>
            <p className="text-sm font-extralight mx-auto text-center">
              {character.lineage.title}: {character.lineage.stat}
            </p>
          </>
        )}
      </div>
      <div className="">
        <div className="flex flex-wrap md:grid md:grid-cols-2 gap-4 justify-center mx-auto w-auto md:w-max">
          <ResourceDisplay
            current={character.currentHealth}
            max={character.maxHealth}
            update={updateCurrentHealth}
            label="Health"
          />
          <ResourceDisplay
            current={character.currentStamina}
            max={character.maxStamina}
            update={updateCurrentStamina}
            label="Stamina"
          />
        </div>
      </div>
      <div className="bg-teal-100 dark:bg-teal-950 border-y-2 border-teal-200 dark:border-teal-800">
        <VerticalLabeledBox label="Combat">
          <div className="flex flex-wrap md:grid grid-cols-4 gap-0 justify-center mx-auto w-auto md:w-max justify-items-center">
            <CombatStatDisplay stat={character.attack} label="Attack" />
            <CombatStatDisplay
              stat={
                character.baseDamage.count +
                "d" +
                character.baseDamage.dice +
                (character.baseDamage.stat > 0
                  ? "+" + character.baseDamage.stat
                  : "")
              }
              label="Damage"
            />
            <div className="col-span-2">
              <CombatStatDisplay
                stat={
                  character.range?.min === character.range?.max
                    ? character.range.min + " ft."
                    : character.range?.min +
                      "ft. - " +
                      character.range?.max +
                      "ft."
                }
                label="Range"
              />
            </div>

            <CombatStatDisplay stat={character.armor} label="Armor" />
            <CombatStatDisplay stat={character.counter} label="Counter" />

            <div className="">
              <CombatStatDisplay
                stat={
                  character.deflect.count +
                  "d" +
                  character.deflect.dice +
                  (character.deflect.flat ? "+" + character.deflect.flat : "")
                }
                label="Deflect"
              />
            </div>
            <CombatStatDisplay
              stat={character.deflectDice}
              label="Deflect Dice"
            />
          </div>
        </VerticalLabeledBox>
      </div>
      <div className="flex flex-row gap-4 justify-center mx-auto w-max mb-2">
        <span>
          {isEditable ? (
            <div className="pt-2 flex flex-row gap-4 justify-center mx-auto w-max">
              <DropdownField
                name="Armor"
                options={character.characterClass.training.armor.map((a) => {
                  return a.toLowerCase();
                })}
                defaultValue={character.armorName}
                onChange={(e) => {
                  const newCharacter = new PlayerCharacter(
                    undefined,
                    undefined,
                    undefined,
                    character,
                  );
                  newCharacter.armorName = e.target.value as ArmorType;
                  setCharacter(newCharacter);
                }}
              />
              <DropdownField
                name="Shield"
                options={character.characterClass.training.shields.map((s) => {
                  return s.toLowerCase();
                })}
                defaultValue={character.shieldName}
                onChange={(e) => {
                  const newCharacter = new PlayerCharacter(
                    undefined,
                    undefined,
                    undefined,
                    character,
                  );
                  console.log(e.target.value);
                  newCharacter.shieldName = e.target.value as ShieldType;
                  setCharacter(newCharacter);
                }}
              />
            </div>
          ) : (
            <div className="pt-2 flex flex-row gap-4 justify-center mx-auto w-max">
              <SmallField label="Armor">
                <span className="text-lg font-light capitalize">
                  {character.armorName}
                </span>
              </SmallField>
              <SmallField label="Shield">
                <span className="text-lg font-light capitalize">
                  {character.shieldName}
                </span>
              </SmallField>
            </div>
          )}
        </span>
      </div>
      {character.shieldName === ShieldType.MEDIUM && (
        <div className="clear-both mx-auto w-max mb-2">
          <p className="font-extralight text-sm dark:text-gray-200 text-gray-800 italic">
            Reroll 1s on your Deflect Dice
          </p>
        </div>
      )}
      <div className="flex flex-col md:grid md:grid-cols-3 gap-1 justify-center px-auto w-full py-4 bg-teal-100 dark:bg-teal-950 border-y-2 border-teal-200 dark:border-teal-800">
        <div className="mx-auto">
          <Button
            color="green"
            buttonType={ButtonType.simple}
            onClick={() => {
              const newCharacter = new PlayerCharacter(
                undefined,
                undefined,
                undefined,
                character,
              );
              newCharacter.catchBreath();
              setCharacter(newCharacter);
            }}
          >
            Catch Your Breath
          </Button>
        </div>
        <div className="mx-auto">
          <Button
            color="blue"
            buttonType={ButtonType.simple}
            onClick={() => {
              console.log("click");
              const newCharacter = new PlayerCharacter(
                undefined,
                undefined,
                undefined,
                character,
              );
              newCharacter.nightsRest();
              setCharacter(newCharacter);
            }}
          >
            Night&#39;s Rest
          </Button>
        </div>
        <div className="mx-auto">
          <Button
            color="amber"
            buttonType={ButtonType.simple}
            onClick={() => {
              const newCharacter = new PlayerCharacter(
                undefined,
                undefined,
                undefined,
                character,
              );
              newCharacter.restAndRecuperate();
              setCharacter(newCharacter);
            }}
          >
            Rest and Recuperate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCoreInfo;
