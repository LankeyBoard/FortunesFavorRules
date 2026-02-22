import DamageStringMaker from "@/utils/damageStringMaker";
import GenericFeature from "@/utils/GenericFeature";
import { getOrdinal } from "@/utils/utils";
import { FeatureLi } from "../GenericFeatures";
import SmallField from "./SmallField";
import TextBlock from "./TextBlock";
import Tag from "./Tag";
import { EncounterMonsterData } from "@/utils/graphQLtypes";
import NumInput from "./Inputs/NumInput";
import { useState, useEffect } from "react";
import Button, { ButtonType } from "./Inputs/Button";
import Sword from "../icons/Sword";
import Plus from "../icons/Plus";

type MonsterEncounterProps = {
  monster: EncounterMonsterData;
  onDamageApplied?: (monsterName: string, previousHealth: number) => void;
};

const HealthBar = ({
  currentHealth,
  maxHealth,
}: {
  currentHealth: number;
  maxHealth: number;
}) => {
  const percent = Math.max(Math.min((currentHealth / maxHealth) * 100, 100), 0);
  const overLimit = currentHealth <= 0;
  const barColor = overLimit ? "bg-red-500" : "bg-gray-300 dark:bg-black";

  return (
    <div className="w-full max-w-xs mx-auto my-2 flex flex-row">
      <div
        className={`w-full h-4 ${barColor} rounded overflow-hidden inline-block`}
      >
        <div
          className={`h-full bg-lime-500 transition-all duration-300`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="justify-between mb-1 mx-2 text-xs font-semibold">
        <span>
          {currentHealth}/{maxHealth}
        </span>
        {overLimit && <span>Dead</span>}
      </div>
    </div>
  );
};

const MonsterEncounterCard: React.FC<MonsterEncounterProps> = ({
  monster,
  onDamageApplied,
}) => {
  const [currentHealth, setCurrentHealth] = useState(monster.currentHealth);
  const [damageValue, setDamageValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [damageHistory, setDamageHistory] = useState<Array<number>>([]);
  useEffect(() => {
    setCurrentHealth(monster.currentHealth);
  }, [monster.currentHealth]);

  const handleDamageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const damage = parseInt(damageValue, 10);
    if (!isNaN(damage)) {
      onDamageApplied?.(monster.name, currentHealth);
      setCurrentHealth(currentHealth - damage);
      setDamageHistory([...damageHistory, damage]);
      setDamageValue("");
    }
  };
  return (
    <div
      className="w-full xl:w-1/2 block p-2 bg-slate-500/10 dark:bg-slate-500/10 scroll-mt-44"
      id={monster.name}
    >
      <div
        className="w-full h-fit bg-teal-300 dark:bg-teal-700 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h1 className="text-lg p-2 font-semibold">{monster.name}</h1>
        <HealthBar
          currentHealth={currentHealth}
          maxHealth={monster.maxHealth}
        />
        <div className="text-slate-700 dark:text-slate-200 text-base ordinal pr-2">
          {monster.level}
          <span className="underline text-xs align-text-top">
            {getOrdinal(monster.level)}
          </span>{" "}
          level
        </div>
      </div>
      {isExpanded ? (
        <>
          <div className="m-2">
            <TextBlock text={monster.description} />
            <div className="flex my-2">
              <Tag className="">
                <span className="capitalize">{monster.size.toLowerCase()}</span>
              </Tag>
              <Tag className="bg-amber-200 dark:bg-amber-800">
                {monster.type}
              </Tag>
              {monster.tags?.map((tag) => (
                <Tag className="bg-slate-300 dark:bg-slate-700" key={tag}>
                  {tag}
                </Tag>
              ))}
            </div>

            <div className="flex flex-col md:flex-row mb-2 bg-teal-100 dark:bg-teal-950">
              {monster.Stats && (
                <div className="flex mx-auto md:mr-2">
                  <SmallField label="Mettle">{monster.Stats.mettle}</SmallField>
                  <SmallField label="Agility">
                    {monster.Stats.agility}
                  </SmallField>
                  <SmallField label="Heart">{monster.Stats.heart}</SmallField>
                  <SmallField label="Intellect">
                    {monster.Stats.intellect}
                  </SmallField>
                </div>
              )}
              <div className="flex flex-row mx-auto md:mr-2 bg-teal-200 dark:bg-teal-800 ">
                <SmallField label="Health">{monster.maxHealth}</SmallField>
                <SmallField label="Armor">{monster.armor}</SmallField>
              </div>
              <div className="flex flex-row mx-auto">
                <SmallField label="To Hit">
                  {monster.hit > 0 && "+"}
                  {monster.hit}
                </SmallField>
                <SmallField label="Range">
                  {monster.range.min === monster.range?.max
                    ? monster.range.min + " ft."
                    : monster.range?.min +
                      "ft. - " +
                      monster.range?.max +
                      "ft."}
                </SmallField>
                <SmallField label="Damage">
                  {DamageStringMaker(monster.damage, monster.Stats)}
                </SmallField>
              </div>
            </div>
            <div className="flex flex-row mt-2">
              <form
                onSubmit={handleDamageSubmit}
                className="block flex-none mr-4"
              >
                <NumInput
                  className="w-36 my-auto"
                  placeholder={"damage taken"}
                  value={damageValue}
                  onChange={(e) => setDamageValue(e.target.value)}
                />
                <Button
                  buttonType={ButtonType.icon}
                  color="amber"
                  type="submit"
                  className="mx-2 my-auto p-1 h-7 align-bottom bg-amber-300 dark:bg-amber-700 fill-gray-700 dark:fill-gray-300 hover:bg-amber-500"
                >
                  <Plus className="w-full h-full" />
                </Button>
              </form>
              {damageHistory.length > 0 && (
                <span className="my-auto text-sm text-gray-700 dark:text-gray-300">
                  Damage: {damageHistory.join(" + ")}
                </span>
              )}
            </div>

            {monster.features &&
              monster.features.map((feature) => (
                <FeatureLi
                  key={feature.slug}
                  feature={
                    new GenericFeature(
                      feature.title,
                      feature.slug,
                      feature.ruleType,
                      feature.text ?? [],
                    )
                  }
                />
              ))}
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default MonsterEncounterCard;
