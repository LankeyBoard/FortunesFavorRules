import PlayerCharacter from "@/utils/PlayerCharacter";
import React, { Dispatch, SetStateAction } from "react";
import NumInput from "../Inputs/NumInput";
import SmallField from "../SmallField";
import LockableSmallTextInput from "../Inputs/LockableSmallTextInput";
import VerticalLabeledBox from "../VerticalLabeledBox";
import CharacterFeatures from "./CharacterFeatures";
import Button, { ButtonType } from "../Inputs/Button";

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
      <p className="text-xs tracking-tighter opacity-80">{label}</p>
    </div>
  );
};

const CharacterCoreInfo = ({
  character,
  setCharacter,
  isEditable,
}: {
  character: PlayerCharacter;
  setCharacter: Dispatch<SetStateAction<PlayerCharacter | undefined>>;
  isEditable: boolean;
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

  return (
    <div className="m-auto">
      <VerticalLabeledBox label="stats">
        <div className="p-4 grid grid-cols-4 gap-2 justify-center w-max mx-auto">
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
      <div className="bg-teal-100 dark:bg-teal-950">
        <div className="grid grid-cols-2 gap-4 justify-center mx-auto w-max">
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
      <VerticalLabeledBox label="Combat">
        <div className="grid grid-cols-4 gap-0 justify-center mx-auto w-max justify-items-center">
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
                  ? character.range.min
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
      <div className="flex flex-col md:grid md:grid-cols-3 gap-1 justify-center px-auto w-full py-4 bg-teal-100 dark:bg-teal-950">
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
            color="gray"
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
      <div>
        <CharacterFeatures
          character={character}
          setCharacter={setCharacter}
          features={character.actions}
          isEditable={isEditable}
          label="Actions"
        />
      </div>
      <div>
        <CharacterFeatures
          character={character}
          setCharacter={setCharacter}
          features={character.counters}
          isEditable={isEditable}
          label="Counters"
        />
      </div>
    </div>
  );
};

export default CharacterCoreInfo;
