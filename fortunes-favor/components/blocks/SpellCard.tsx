import { Spell } from "@/utils/graphQLQueries/AllSpellsQuery";
import { getOrdinal } from "@/utils/utils";

const SpellCard = ({ spell }: { spell: Spell }) => {
  return (
    <div className="pb-3 mb-4 dark:bg-slate-800 bg-slate-200">
      <div className="flex p-2 bg-teal-300 dark:bg-teal-800">
        <h2 className="text-lg font-semibold float-left grow">{spell.name}</h2>
        <div className="text-slate-700 dark:text-slate-200 float-right text-base ordinal">
          {spell.level}
          <span className="underline text-xs align-text-top">
            {getOrdinal(spell.level)}
          </span>{" "}
          level
        </div>
      </div>
      <div className="clear-both px-4">
        <p>
          <strong>Type:</strong> {spell.type.join(", ")}
        </p>
        <p>
          <strong>Casting Time:</strong> {spell.castingTime}
        </p>
        <p>
          <strong>Duration:</strong> {spell.duration}
        </p>
        <p>
          <strong>Range:</strong> {spell.range}
        </p>
        <p>{spell.description}</p>
      </div>
    </div>
  );
};
export default SpellCard;
