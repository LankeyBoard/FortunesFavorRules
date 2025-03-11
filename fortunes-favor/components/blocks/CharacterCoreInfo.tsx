import PlayerCharacter from "@/utils/PlayerCharacter";
import React from "react";
import { FeatureLi } from "../GenericFeatures";

const StatDisplay = ({
  stat,
  label,
}: {
  stat: number | string;
  label: string;
}) => {
  return (
    <div className="grid grid-cols-1 gap-2 text-center w-10">
      <span className="text-xl font-light">{stat}</span>
      <span className="text-xs tracking-tighter opacity-80">{label}</span>
    </div>
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
    <div className="grid grid-cols-1 gap-2 text-center">
      <span className="text-xl font-light">{stat}</span>
      <span className="text-xs tracking-tighter opacity-80">{label}</span>
    </div>
  );
};

const ResourceDisplay = ({
  current,
  max,
  label,
}: {
  current: number;
  max: number;
  label: string;
}) => {
  return (
    <div className="grid grid-cols-1 justify-items-center p-4">
      <div>
        <span className="text-xl align-text-bottom">{current}</span>
        <span className="font-extralight"> / </span>
        <span className="font-extralight align-text-top">{max}</span>
      </div>
      <p className="text-xs tracking-tighter opacity-80">{label}</p>
    </div>
  );
};

const CharacterCoreInfo = ({ character }: { character: PlayerCharacter }) => {
  return (
    <div className="m-auto">
      <div className="p-4 grid grid-cols-4 gap-4 justify-center w-max mx-auto">
        <StatDisplay stat={character.stats.mettle} label="Mettle" />
        <StatDisplay stat={character.stats.agility} label="Agility" />
        <StatDisplay stat={character.stats.heart} label="Heart" />
        <StatDisplay stat={character.stats.intellect} label="Intellect" />
      </div>
      <div className="grid grid-cols-2 gap-4 justify-center mx-auto w-max">
        <ResourceDisplay
          current={character.currentHealth}
          max={character.maxHealth}
          label="Health"
        />
        <ResourceDisplay
          current={character.currentStamina}
          max={character.maxStamina}
          label="Stamina"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 justify-center mx-auto w-max">
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
              : character.range?.min + " - " + character.range?.max
          }
          label="Range"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 justify-center mx-auto w-max">
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
            <h3>Actions</h3>
            {character.actions.map((action) => (
              <div key={action.slug}>
                <h4>{action.title}</h4>
                <FeatureLi feature={action} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        {character.counters && character.counters.length > 0 && (
          <div>
            <h3>Counters</h3>
            {character.counters.map((action) => (
              <div key={action.slug}>
                <h4>{action.title}</h4>
                <FeatureLi feature={action} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterCoreInfo;
