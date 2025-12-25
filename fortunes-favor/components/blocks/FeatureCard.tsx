import PlayerCharacter, {
  PlayerCharacterFeature,
} from "@/utils/PlayerCharacter";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TextBlock from "./TextBlock";
import { CharacterSheetViewMode } from "../CharacterSheet";
import { RuleText } from "@/utils/graphQLtypes";

type FeatureCardProps = {
  feature: PlayerCharacterFeature;
  source: string;
  character?: PlayerCharacter;
  setCharacter?: Dispatch<SetStateAction<PlayerCharacter | undefined>>;
  isExpanded: boolean;
  viewMode?: CharacterSheetViewMode;
};

export const hasInsufficientChoices = (
  choices: PlayerCharacterFeature["choices"],
  chooseNum: number,
): boolean => {
  if (!choices) return false;
  const matchingChoices = choices.filter((choice) => choice.isChosen);
  return matchingChoices.length < chooseNum;
};

export const FeatureCardTitle = ({
  feature,
  source,
}: {
  feature: PlayerCharacterFeature;
  source: string;
}) => {
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
  return (
    <div className={titleStyle}>
      <h1 className="text-lg font-semibold float-left grow">
        {feature.title}
        {feature.level > 0 && (
          <span className="ml-2 font-light text-base">
            level {feature.level}
          </span>
        )}
      </h1>
      <h3 className="float-right">{resultType}</h3>
    </div>
  );
};

const FeatureCard = ({
  feature,
  source,
  character,
  setCharacter,
  isExpanded,
  viewMode = CharacterSheetViewMode.ViewOnly,
}: FeatureCardProps) => {
  const [cardFeature, setFeature] = useState(feature);
  const [showAllChoices, setShowAllChoices] = useState(
    character
      ? hasInsufficientChoices(feature.choices, feature.chooseNum)
      : true,
  );
  const [isOpen, setOpen] = useState(isExpanded);
  useEffect(() => {
    setOpen(isExpanded);
  }, [isExpanded]);
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
      feature.chooseNum,
      feature.isVariant,
      feature.shortText,
      feature.level,
    );
    if (!showAllChoices) {
      if (newFeature.choices)
        newFeature.choices = newFeature.choices.filter(
          (choice) => choice.isChosen,
        );
      setFeature(newFeature);
    }
  }, [feature, showAllChoices]);

  const choiceStyle =
    "p-2 odd:bg-slate-300 dark:odd:bg-slate-700 cursor-pointer hover:border-2 hover:border-amber-300 hover:dark:border-amber-700 hover:bg-slate-200 hover:dark:bg-slate-800";
  const selectedChoiceStyle = choiceStyle + " border-2 border-amber-500";
  const deselectedChoiceStyle =
    choiceStyle +
    " border-2 border-gray-100 dark:border-gray-900 odd:border-slate-300 odd:dark:border-slate-700";
  if (!isOpen) {
    return (
      <div
        className="pb-3 hover:cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      >
        <FeatureCardTitle feature={feature} source={source} />{" "}
      </div>
    );
  }
  return (
    <>
      <div className="pb-3">
        <div onClick={() => setOpen(false)} className="hover:cursor-pointer">
          <FeatureCardTitle feature={feature} source={source} />
        </div>

        <div className="clear-both">
          <TextBlock text={cardFeature.text} style="px-4" />
          <div className="m-4 ">
            {cardFeature.choices && cardFeature.choices.length > 0 && (
              <div>
                {cardFeature.choices.map((choice) => {
                  if (!choice || !choice.choice) return;
                  if ("slug" in choice.choice) {
                    return (
                      <div
                        key={choice.choice.slug}
                        id={choice.choice.slug}
                        className={
                          choice.isChosen
                            ? selectedChoiceStyle
                            : deselectedChoiceStyle
                        }
                        onClick={(click) => {
                          if (viewMode === CharacterSheetViewMode.Owner) {
                            if (feature.isSlugChosen(click.currentTarget.id)) {
                              console.log("REMOVE CHOSEN");
                              feature.removeChosen(click.currentTarget.id);
                            } else feature.addChosen(click.currentTarget.id);
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
                                feature.chooseNum,
                                feature.isVariant,
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
                          }
                        }}
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

                        {choice.choice.text && (
                          <TextBlock
                            text={
                              choice.choice.text.filter(
                                (t) => t != undefined && t.text != undefined,
                              ) as RuleText[]
                            }
                            style="mx-2 font-light"
                          />
                        )}
                      </div>
                    );
                  } else {
                    return (
                      <TextBlock
                        key={choice.choice.text}
                        text={[choice.choice]}
                        style="mx-2 font-light"
                      />
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

export default FeatureCard;
