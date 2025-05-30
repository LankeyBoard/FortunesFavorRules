import { useState, useEffect, SetStateAction, Dispatch } from "react";
import Card from "./blocks/Card";
import OptionPopout from "./blocks/OptionPopout";
import PlayerCharacter from "../utils/PlayerCharacter";
import { OptionTypes } from "../utils/enums";

const getSelectedSlug = (
  optionType: OptionTypes,
  currentCharacter: PlayerCharacter,
) => {
  switch (optionType) {
    case OptionTypes.CULTURE:
      return currentCharacter.culture?.slug;
    case OptionTypes.LINEAGE:
      return currentCharacter.lineage?.slug;
    case OptionTypes.CLASS:
      return currentCharacter.characterClass?.slug;
    default:
      return undefined;
  }
};

type selectFromCardsProps = {
  optionType: OptionTypes;
  options: any[];
  popoutInner: (json: any) => JSX.Element;
  optionsDescription: string;
  currentCharacter: PlayerCharacter;
  updateCharacter: Dispatch<SetStateAction<PlayerCharacter>>;
};

const SelectFromCards = ({
  optionType,
  options,
  popoutInner,
  optionsDescription,
  currentCharacter,
  updateCharacter,
}: selectFromCardsProps) => {
  const [showPopout, setShowPoput] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>(
    getSelectedSlug(optionType, currentCharacter),
  );
  const [currentSlug, setCurentSlug] = useState<string | undefined>(
    getSelectedSlug(optionType, currentCharacter),
  );
  const [currentChild, setCurrentChild] = useState<JSX.Element | undefined>(
    undefined,
  );
  useEffect(() => {
    if (currentSlug) {
      const selectedJson = {
        json: options.find((o) => o.slug === currentSlug),
      };
      if (selectedJson) {
        setCurrentChild(popoutInner(selectedJson));
      }
    }
  }, [currentSlug, options, popoutInner]);
  const pickCard = (slug: string) => {
    setCurentSlug(slug);
    setShowPoput(true);
  };

  useEffect(() => {
    handleSelection(selectedSlug);
  }, [selectedSlug]);

  const handleSelection = (slug: string | undefined) => {
    setCurentSlug(slug);
    let updatedCharacter = structuredClone(currentCharacter);
    switch (optionType) {
      case OptionTypes.CULTURE:
        let culture;
        if (slug === undefined) {
          culture = undefined;
        } else {
          culture = options.find((c) => c.slug === slug);
        }
        updatedCharacter.culture = culture;
        break;
      case OptionTypes.CLASS:
        let characterClass;
        if (slug === undefined) {
          characterClass = undefined;
        } else {
          characterClass = options.find((c) => c.slug === slug);
        }
        updatedCharacter.characterClass = characterClass;
        break;
      case OptionTypes.LINEAGE:
        let lineage;
        if (slug === undefined) {
          lineage = undefined;
        } else {
          lineage = options.find((c) => c.slug === slug);
        }
        updatedCharacter.lineage = lineage;
        break;
    }
    updateCharacter(updatedCharacter);
  };

  return (
    <div className="w-full">
      {showPopout && (
        <OptionPopout
          child={currentChild}
          showPopout={setShowPoput}
          isSelected={selectedSlug === currentSlug}
          setSelectedSlug={setSelectedSlug}
          large={optionType === OptionTypes.CLASS}
        />
      )}
      <div>
        <div className="italic my-4 mx-4">{optionsDescription}</div>
        <div className="text-sm text-slate-300 mx-4">
          Click on each of the options below for more information.
        </div>
        <div className="w-fit">
          <div className="flex flex-wrap">
            {options.map((c) => {
              if (
                typeof c.title === "string" &&
                typeof c.desc === "string" &&
                typeof c.slug === "string"
              ) {
                return (
                  <Card
                    title={c.title}
                    text={c.desc}
                    slug={c.slug}
                    pickCard={pickCard}
                    selectedSlug={selectedSlug}
                    key={"card-" + c.title}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectFromCards;
