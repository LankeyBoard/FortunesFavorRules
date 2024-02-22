import CharacterCulture from "../utils/CharacterCulture";
import Traits from "./Traits";

const Culture = (json: any) => {
  const c = json.json
    ? new CharacterCulture(json.json)
    : new CharacterCulture(json.culture);
  return (
    <div id={c.slug} className="mb-6">
      <div className="my-4 text-2xl tracking-wide">{c.title}</div>
      <div className="italic">{c.desc}</div>
      <div>
        <span className="font-semibold">Language - </span>
        {c.lang}
      </div>
      <div>
        <span className="font-semibold">Stat - </span>
        {c.stat}
      </div>
      <Traits title="Traits" traits={c.traits} />
      {c.options && <Traits title="Options" traits={c.options} />}
    </div>
  );
};

export default Culture;
