import PlayerCharacter, {
  PlayerCharacterFeature,
} from "@/utils/PlayerCharacter";
import FeatureCard from "./FeatureCard";
import { Dispatch, SetStateAction } from "react";

const SelectableFeatureCard = ({
  feature,
  character,
  setCharacter,
}: {
  feature: PlayerCharacterFeature;
  character: PlayerCharacter;
  setCharacter: Dispatch<SetStateAction<PlayerCharacter | undefined>>;
}) => {
  const isSelected =
    character.features?.find((f) => {
      return f.slug === feature.slug;
    }) !== undefined;
  const selectedStyle =
    "border-2 border-amber-300 dark:border-amber-700 hover:border-amber-500 cursor-pointer";
  const deselectedStyle = "border-2 hover:border-amber-500 cursor-pointer";
  return (
    <div
      key={feature.slug}
      onClick={(e) => {
        e.stopPropagation();
        const newCharacter = new PlayerCharacter(
          undefined,
          undefined,
          undefined,
          character,
        );
        isSelected
          ? newCharacter.removeGenericFeature(feature.slug)
          : newCharacter.addGenericFeature(feature);
        console.log(newCharacter);
        setCharacter(newCharacter);
      }}
      className={isSelected ? selectedStyle : deselectedStyle}
    >
      <div className="pointer-events-none">
        <FeatureCard
          feature={feature}
          source={feature.source}
          isExpanded={true}
        />
      </div>
    </div>
  );
};

export default SelectableFeatureCard;
