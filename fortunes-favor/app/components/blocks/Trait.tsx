import { CharacterTrait } from "@/app/utils/CharacterTrait";
import TextBlock from "./TextBlock";
const Trait = ({ t }: { t: CharacterTrait }) => {
  return (
    <div key={t.title + "trait"} className="">
      <span className="font-light text-lg inline-block">{t.title}: &nbsp;</span>
      <TextBlock text={t.text} inline={true} />
      <div className="">
        {t.choices && t.choices.length > 0 && (
          <div>
            {t.choices.map((choice) => {
              if (typeof choice.text === "string") {
                return (
                  <p
                    key={choice.text}
                    className="odd:bg-slate-300 even:bg-gray-100 dark:odd:bg-gray-900 dark:even:bg-slate-700 p-2"
                  >
                    {choice.text}
                  </p>
                );
              } else if ("slug" in choice) {
                return (
                  <div
                    key={choice.slug}
                    className="odd:bg-slate-300 even:bg-gray-100 dark:odd:bg-gray-900 dark:even:bg-slate-700 p-2"
                  >
                    <h3 className="font-semibold">{choice.title}</h3>
                    {choice.staminaCost > 0 && (
                      <span id="StaminaCost" className="font-light mx-2">
                        Stamina: {choice.staminaCost}
                      </span>
                    )}
                    {choice.costsFortunesFavor && (
                      <span id="FortuneCost">Fortune&apos;s Favor</span>
                    )}
                    <TextBlock text={choice.text} style="mx-2 inline-block" />
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trait;
