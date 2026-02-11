import DamageStringMaker from "@/utils/damageStringMaker";
import GenericFeature from "@/utils/GenericFeature";
import { Monster } from "@/utils/graphQLQueries/monsters/AllMonstersQuery";
import { getOrdinal } from "@/utils/utils";
import { FeatureLi } from "../GenericFeatures";
import SmallField from "./SmallField";
import TextBlock from "./TextBlock";
import Tag from "./Tag";

type MonsterProps = {
  monster: Monster;
};

const MonsterCard: React.FC<MonsterProps> = ({ monster }) => (
  <div
    className="w-full xl:w-1/2 block p-2 bg-slate-500/10 dark:bg-slate-500/10 scroll-mt-44"
    id={monster.name}
  >
    <div className="w-full h-fit bg-teal-300 dark:bg-teal-700 flex justify-between items-center">
      <h1 className="text-lg p-2 font-semibold">{monster.name}</h1>
      <div className="text-slate-700 dark:text-slate-200 text-base ordinal pr-2">
        {monster.level}
        <span className="underline text-xs align-text-top">
          {getOrdinal(monster.level)}
        </span>{" "}
        level
      </div>
    </div>
    <div className="m-2">
      <TextBlock text={monster.description} />
      <div className="flex my-2">
        <Tag className="bg-fuchsia-200 dark:bg-fuchsia-800">{monster.type}</Tag>
        <Tag className="bg-purple-200 dark:bg-purple-800">
          <span className="capitalize">{monster.size.toLowerCase()}</span>
        </Tag>
        {monster.tags?.map((tag) => (
          <Tag className="bg-slate-300 dark:bg-slate-700" key={tag}>
            {tag}
          </Tag>
        ))}
      </div>

      <div className="flex flex-col md:flex-row mb-2 bg-teal-100 dark:bg-teal-950">
        <div className="flex mx-auto flex-wrap md:mr-2">
          <SmallField label="Mettle">{monster.Stats.mettle}</SmallField>
          <SmallField label="Agility">{monster.Stats.agility}</SmallField>
          <SmallField label="Heart">{monster.Stats.heart}</SmallField>
          <SmallField label="Intellect">{monster.Stats.intellect}</SmallField>
        </div>
        <div className="flex flex-row mx-auto flex-wrap md:mr-2 bg-teal-200 dark:bg-teal-800 ">
          <SmallField label="Health">{monster.health}</SmallField>
          <SmallField label="Armor">{monster.armor}</SmallField>
        </div>
        <div className="flex flex-row flex-wrap mx-auto">
          <SmallField label="To Hit">
            {monster.hit > 0 && "+"}
            {monster.hit}
          </SmallField>
          <SmallField label="Range">
            {monster.range.min === monster.range?.max
              ? monster.range.min + " ft."
              : monster.range?.min + "ft. - " + monster.range?.max + "ft."}
          </SmallField>
          <SmallField label="Damage">
            {DamageStringMaker(monster.damage, monster.Stats)}
          </SmallField>
        </div>
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
                feature.text,
              )
            }
          />
        ))}
    </div>
  </div>
);
export default MonsterCard;
