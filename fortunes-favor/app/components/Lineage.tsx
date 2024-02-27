import CharacterLineage from "../utils/CharacterLineage";
import RuleField from "./RuleField";
import Traits from "./Traits";

const Lineage = (json: any) => {
  console.log("Lineage json input: ", json);
  const l = new CharacterLineage(json.json);
  return (
    <div id={l.slug} className="mb-6">
      <div className="py-4 px-2 text-2xl tracking-wide bg-sky-300 dark:bg-sky-800">
        {l.title}
      </div>
      <div className="px-3">
        <div className="italic">{l.desc}</div>
        <div>
          <span className="font-semibold">Size - </span>{" "}
          {typeof l.size === "string" ? (
            <span className="capitalize">{l.size.toLocaleLowerCase()}</span>
          ) : (
            <span className="capitalize">
              {l.size.join(", ").toLocaleLowerCase()}
            </span>
          )}
        </div>
        <div>
          <span className="font-semibold">Speed - </span>
          {l.speed}
        </div>
        <div>
          <span className="font-semibold">Stat - </span>
          {l.stat}
        </div>
        <Traits title="Traits" traits={l.traits} />
      </div>
    </div>
  );
};

export default Lineage;
