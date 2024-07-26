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
        <table className="ml-4 my-2 space-y-2">
          {t.rules?.map((rule) => {
            return (
              <tr
                key={rule.slug}
                className="odd:bg-slate-300 even:bg-slate-200 dark:odd:bg-slate-950 dark:even:bg-slate-700"
              >
                <div className="p-2">
                  <Trait t={rule} />
                </div>
              </tr>
            );
          })}
        </table>
      )}
    </div>
  );
};

export default Trait;
