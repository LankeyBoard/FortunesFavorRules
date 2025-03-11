import PlayerCharacter from "@/utils/PlayerCharacter";
import { FeatureCard } from "./FeatureCard";

const CharacterFeatures = ({ character }: { character: PlayerCharacter }) => {
  return (
    <div>
      {character.features?.map((feature) => (
        <FeatureCard
          key={feature.slug}
          feature={feature}
          source={feature.source}
        />
      ))}
    </div>
  );
};
export default CharacterFeatures;
