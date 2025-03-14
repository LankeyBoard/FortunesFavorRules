import PlayerCharacter from "@/utils/PlayerCharacter";
import React, { Dispatch, SetStateAction } from "react";
import NumInput from "./Inputs/NumInput";
import SmallField from "./SmallField";
import LockableSmallTextInput from "./Inputs/LockableSmallTextInput";
import { FeatureCard } from "./FeatureCard";

const StatDisplay = ({
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
            defaultValue={current}
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
      <div className="p-4 grid grid-cols-6 gap-2 justify-center w-max mx-0">
        <span className="-rotate-90">STATS</span>
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
      <div className=" w-100 bg-teal-950">
        <div className=" grid grid-cols-2 gap-4 justify-center mx-auto w-max">
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
      <div className="grid grid-cols-3 gap-0 justify-center mx-auto w-max justify-items-center">
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
        <CombatStatDisplay
          stat={
            character.range?.min === character.range?.max
              ? character.range.min
              : character.range?.min + "ft. - " + character.range?.max + "ft."
          }
          label="Range"
        />

        <CombatStatDisplay stat={character.armor} label="Armor" />
        <CombatStatDisplay stat={character.counter} label="Counter" />
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
      <div>
        {character.actions && character.actions.length > 0 && (
          <div>
            <h2 className="font-thin text-xl mx-auto text-center pb-6 tracking-widest md:pt-6">
              Actions
            </h2>
            {character.actions.map((action) => (
              <div key={action.slug}>
                <FeatureCard feature={action} source={action.source} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        {character.counters && character.counters.length > 0 && (
          <div>
            <h2 className="font-thin text-xl mx-auto text-center pb-6 tracking-widest md:pt-6">
              Counters
            </h2>
            {character.counters.map((counters) => (
              <div key={counters.slug}>
                <FeatureCard feature={counters} source={counters.source} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterCoreInfo;
