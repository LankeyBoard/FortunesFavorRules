import { BeastMasterBeast, BeastMasterBeasts } from "@/utils/CharacterClass";
import { DamageTypes } from "./FormDisplay";
import SlugLinker from "./SlugLinker";

type BeastDisplayProps = {
  beastMasterPet: BeastMasterBeasts;
};

export const BeastDisplay = ({ beast }: { beast: BeastMasterBeast }) => {
  return (
    <div
      key={beast.slug}
      className="bg-slate-200 dark:bg-slate-800 my-5 md:mx-10"
      id={beast.slug}
    >
      <h1 className="bg-teal-200 dark:bg-teal-800 text-lg p-2 font-semibold">
        {beast.title}
      </h1>
      <div className="px-4 py-2">
        <div>
          <span className="font-bold">Health: </span>
          <span>
            {beast.health.base} (+{beast.health.perLevel} per level)
          </span>
        </div>
        <div>
          <span className="font-bold">Armor: </span>
          <span>{beast.armor}</span>
        </div>
        <div>
          <span className="font-bold">Speed: </span>
          {beast.speed.map((speed, index) => (
            <span key={"speed" + index}>
              {speed.speed} ft. {speed.type}
              {index < beast.speed.length - 1 && ", "}
            </span>
          ))}
        </div>
        <div>
          <span className="font-bold">Stats: </span>
          <span>
            Agility: {beast.stats.agility}, Heart: {beast.stats.heart},
            Intellect: {beast.stats.intellect}, Mettle: {beast.stats.mettle}
          </span>
        </div>
        <div>
          <span className="font-bold">Damage: </span>
          <span className="capitalize">
            {beast.damage.count}d{beast.damage.dice} +{" "}
            {beast.damage.stat.map((stat) => stat.toLowerCase())}
          </span>{" "}
          <DamageTypes damageArr={beast.damage.type} />
        </div>
        <div className="mt-4 mb-2">
          {beast.abilities.map((ability, index) => (
            <div key={index} className="mb-2">
              <h4 className="inline font-semibold">
                {ability.title} ({ability.type}):{" "}
              </h4>
              <span>
                <SlugLinker text={ability.text} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BeastmasterBeastsSection = ({ beastMasterPet }: BeastDisplayProps) => {
  return (
    <div className="my-5" id={beastMasterPet.slug}>
      <h1 className="py-2 my-2 px-2 text-2xl tracking-wide bg-purple-300 dark:bg-purple-800">
        {beastMasterPet.title}
      </h1>
      <div className="py-2">
        <p className="mb-4 mx-4">{beastMasterPet.description}</p>
        {beastMasterPet.beasts.map((beast: BeastMasterBeast) => (
          <BeastDisplay beast={beast} key={beast.slug} />
        ))}
      </div>
    </div>
  );
};

export default BeastmasterBeastsSection;
