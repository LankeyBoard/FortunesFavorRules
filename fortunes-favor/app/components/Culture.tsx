import CharacterCulture from "../utils/CharacterCulture";
import Traits from "./Traits";

const Culture = (json: any) => {
  const c = json.json
    ? new CharacterCulture(json.json)
    : new CharacterCulture(json.culture);
  return (
    <div id={c.slug} className="mb-6">
      <div className="py-4 px-2 text-2xl tracking-wide bg-blue-300 dark:bg-blue-800">
        {c.title}
      </div>
      <div className="px-3">
        <div className="italic">{c.desc}</div>
        <div>
          <span className="font-semibold">Language: </span>
          {c.lang}
        </div>
        <div>
          <span className="font-semibold">Stat: </span>
          {c.stat}
        </div>
        <Traits title="Traits" traits={c.traits} />
        {c.options && <Traits title="Options" traits={c.options} />}
      </div>
    </div>
  );
};

export default Culture;
