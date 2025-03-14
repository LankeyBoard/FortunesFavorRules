import PlayerCharacter, {
  PlayerCharacterFeature,
} from "@/utils/PlayerCharacter";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TextBlock from "./TextBlock";

type FeatureCardProps = {
  feature: PlayerCharacterFeature;
  source: string;
  character?: PlayerCharacter;
  setCharacter?: Dispatch<SetStateAction<PlayerCharacter | undefined>>;
};

export const hasInsufficientChoices = (
  selectedSlugs: string[],
  choices: PlayerCharacterFeature["choices"],
  chooseNum: number,
): boolean => {
  const matchingChoices = choices.filter(
    (choice) =>
      ("slug" in choice && selectedSlugs.includes(choice.slug)) ||
      ("text" in choice &&
        typeof choice.text === "string" &&
        selectedSlugs.includes(choice.text)),
  );
  return matchingChoices.length < chooseNum;
};

export const FeatureCard = ({
  feature,
  source,
  character,
  setCharacter,
}: FeatureCardProps) => {
  const [cardFeature, setFeature] = useState(feature);
  const [showAllChoices, setShowAllChoices] = useState(
    character
      ? hasInsufficientChoices(
          character.choices,
          feature.choices,
          feature.chooseNum,
        )
      : true,
  );
  useEffect(() => {
    const newFeature = new PlayerCharacterFeature(
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
      feature.level,
    );
    if (!showAllChoices) {
      newFeature.choices = newFeature.choices.filter((choice) => {
        if ("slug" in choice) {
          return newFeature.chosen.includes(choice.slug);
        }
      });
      setFeature(newFeature);
    }
  }, [feature, showAllChoices]);
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

  const choiceStyle =
    "p-2 odd:bg-slate-300 dark:odd:bg-slate-700 cursor-pointer hover:border-2 hover:border-amber-300 hover:dark:border-amber-700 hover:bg-slate-200 hover:dark:bg-slate-800";
  const selectedChoiceStyle = choiceStyle + " border-2 border-amber-500";
  const deselectedChoiceStyle =
    choiceStyle +
    " border-2 border-gray-100 dark:border-gray-900 odd:border-slate-300 odd:dark:border-slate-700";
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
          <TextBlock text={cardFeature.text} style="px-4" />
          <div className="m-4 ">
            {cardFeature.choices && cardFeature.choices.length > 0 && (
              <div>
                {cardFeature.choices.map((choice) => {
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
                            : deselectedChoiceStyle
                        }
                        onClick={(click) => {
                          if (feature.chosen.includes(click.currentTarget.id)) {
                            feature.removeChoice(click.currentTarget.id);
                          } else feature.addChoice(click.currentTarget.id);
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
                              feature.level,
                            ),
                          );
                          setShowAllChoices(
                            feature.chosen.length < feature.chooseNum,
                          );
                          if (setCharacter) {
                            const newCharacter = new PlayerCharacter(
                              undefined,
                              undefined,
                              undefined,
                              character,
                            );
                            newCharacter.updateFeature(feature);
                            setCharacter(newCharacter);
                          }
                        }}
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
                        <TextBlock text={choice.text} style="mx-2 font-light" />
                      </div>
                    );
                  }
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
