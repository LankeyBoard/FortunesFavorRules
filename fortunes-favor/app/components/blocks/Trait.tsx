import { CharacterTrait } from "@/app/utils/CharacterTrait";
const Trait = ({ t }: { t: CharacterTrait }) => {
  return (
    <div key={t.title + "trait"} className="">
      <span className="font-light text-lg">{t.title}: &nbsp;</span>
      <span className="">
        {t.text.map((t) => (
          <span key={t.text}>{t.text}</span>
        ))}
      </span>
      {t.rules && (
        <div className="px-4 py-2 space-y-2 bg-slate-700">
          {t.rules?.map((rule) => {
            return <Trait key={rule.slug} t={rule} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Trait;
