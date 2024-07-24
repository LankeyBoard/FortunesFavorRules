import { PlayerCharacterFeature } from "@/app/utils/PlayerCharacter";
import { useState } from "react";

type FeatureCardProps = {
  feature: PlayerCharacterFeature;
  source: string;
};

export const FeatureCard = ({ feature, source }: FeatureCardProps) => {
  const [cardFeature, setFeature] = useState(feature);
  let titleStyle = "flex p-2";
  let resultType = "";
  switch (source) {
    case "class":
      titleStyle += " bg-teal-300 dark:bg-teal-800";
      resultType = "Class";
      break;
    case "rule":
      titleStyle += " bg-purple-300 dark:bg-purple-800";
      resultType = "Rule";
      break;
    case "culture":
      titleStyle += " bg-blue-300 dark:bg-blue-800";
      resultType = "Culture";
      break;
    case "lineage":
      titleStyle += " bg-sky-300 dark:bg-sky-800";
      resultType = "Lineage";
      break;
    case "noviceFeature":
      titleStyle += " bg-fuchsia-300 dark:bg-fuchsia-900";
      resultType = "Novice Feature";
      break;
    case "veteranFeature":
      titleStyle += " bg-fuchsia-300 dark:bg-fuchsia-900";
      resultType = "Veteran Feature";
      break;
    default:
      titleStyle += " bg-red-500";
  }
  console.log("feature card choices", feature);
  if (cardFeature.chosen.length > 0 && cardFeature.choices.length > 0)
    console.log("here", cardFeature.chosen[0] in cardFeature.choices[0]);
  const choiceStyle =
    "odd:bg-slate-300 dark:odd:bg-slate-700 cursor-pointer p-2";
  const selectedChoiceStyle = choiceStyle + " border-2 border-amber-500";
  return (
    <>
      <div className="pb-3">
        <div className={titleStyle}>
          <h1 className="text-lg font-semibold float-left grow">
            {cardFeature.title}
            {cardFeature.level > 0 && (
              <span className="ml-2 font-light text-base">
                level {cardFeature.level}
              </span>
            )}
          </h1>
          <h3 className="float-right">{resultType}</h3>
        </div>
        <div className="clear-both">
          {cardFeature.text &&
            cardFeature.text.length > 0 &&
            cardFeature.text.map((t) => {
              return (
                <p key={t.text} className={"pl-4 pr-3 pt-3"}>
                  {t.text}
                </p>
              );
            })}
          <div className="m-4 ">
            {cardFeature.choices &&
              cardFeature.choices.length > 0 &&
              cardFeature.choices.map((choice) => {
                if (typeof choice.text === "string") {
                  return <p key={choice.text}>{choice.text}</p>;
                } else if ("slug" in choice) {
                  return (
                    <div
                      key={choice.slug}
                      id={choice.slug}
                      className={
                        cardFeature.chosen.includes(choice.slug)
                          ? selectedChoiceStyle
                          : choiceStyle
                      }
                      onClick={(click) => {
                        if (feature.chosen.includes(click.currentTarget.id))
                          feature.removeChoice(click.currentTarget.id);
                        else feature.addChoice(click.currentTarget.id);
                        setFeature(
                          new PlayerCharacterFeature(
                            feature.title,
                            feature.source,
                            feature.effects,
                            feature.slug,
                            feature.ruleType,
                            feature.text,
                            feature.multiSelect,
                            feature.choices,
                            feature.chosen,
                            feature.chooseNum,
                            feature.shortText,
                            feature.level
                          )
                        );
                        console.log("Clicked choice", cardFeature);
                      }}
                    >
                      <h3>{choice.title}</h3>
                      {choice.staminaCost > 0 && (
                        <span>{choice.staminaCost}</span>
                      )}
                      {choice.text.map((t) => {
                        return (
                          <p key={t.text} className="mx-2 font-light">
                            {t.text}
                          </p>
                        );
                      })}
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </>
  );
};
