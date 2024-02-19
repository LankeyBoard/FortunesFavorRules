import CharacterLineage from "../utils/CharacterLineage";
import RuleField from "./RuleField";
import Traits from "./Traits";

const Lineage = (json: any) => {
  console.log("Lineage json input: ", json);
  const l = new CharacterLineage(json.json);
  return (
    <div id={l.slug} className="mb-6">
      <div className="my-4 text-2xl tracking-wide">{l.title}</div>
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
      {l.traits.map((trait) => {
        return <RuleField key={trait.slug} field={trait} />;
      })}
    </div>
  );
};

export default Lineage;
