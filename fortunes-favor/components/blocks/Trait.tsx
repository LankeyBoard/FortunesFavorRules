import { CharacterTrait } from "@/utils/CharacterTrait";
import TextBlock from "./TextBlock";
const Trait = ({ t }: { t: CharacterTrait }) => {
  return (
    <div key={t.title + "trait"} className="">
      {/* {t.isVariant && <p className="font-extralight text-sm">Variant</p>} */}
      <span
        className={
          t.isVariant
            ? "border-l-4 border-amber-500 font-light text-lg inline-block pl-2"
            : "font-light text-lg inline-block"
        }
      >
        {t.title}: &nbsp;
      </span>
      <TextBlock text={t.text} inline={true} />

      <div className="">
        {t.choices && t.choices.length > 0 && (
          <div>
            {t.choices.map((choice) => {
              if ("slug" in choice.choice) {
                return (
                  <div
                    key={choice.choice.slug}
                    className="odd:bg-slate-300 even:bg-gray-100 dark:odd:bg-gray-900 dark:even:bg-slate-700 p-2"
                  >
                    <h3 className="font-semibold">{choice.choice.title}</h3>
                    {choice.choice.staminaCost > 0 && (
                      <span id="StaminaCost" className="font-light mx-2">
                        Stamina: {choice.choice.staminaCost}
                      </span>
                    )}
                    {choice.choice.costsFortunesFavor && (
                      <span id="FortuneCost">Fortune&apos;s Favor</span>
                    )}
                    <TextBlock
                      text={choice.choice.text}
                      style="mx-2 inline-block"
                    />
                  </div>
                );
              }
              return (
                <TextBlock
                  key={choice.choice.text}
                  text={[choice.choice]}
                  style="odd:bg-slate-300 even:bg-gray-100 dark:odd:bg-gray-900 dark:even:bg-slate-700 p-2"
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trait;
