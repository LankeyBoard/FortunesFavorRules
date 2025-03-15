import PlayerCharacter, {
  PlayerCharacterFeature,
} from "@/utils/PlayerCharacter";

export type GenericCharacterFeatures = {
  noviceFeatures: PlayerCharacterFeature[];
  veteranFeatures: PlayerCharacterFeature[];
};

const FeatureSection = ({
  genericFeatures,
  label,
}: {
  genericFeatures: PlayerCharacterFeature[];
  label: string;
}) => {
  return (
    <div>
      <h2 className="font-thin text-xl mx-auto text-center pb-0 tracking-widest md:pt-6">
        {label}
      </h2>
      <div>
        {genericFeatures.map((feature) => {
          return <div key={feature.slug}>{feature.title}</div>;
        })}
      </div>
    </div>
  );
};

const GenericFeaturePicker = ({
  genericFeatures,
  character,
}: {
  genericFeatures: GenericCharacterFeatures;
  character: PlayerCharacter;
}) => {
  return (
    <>
      <FeatureSection
        label="Novice Features"
        genericFeatures={genericFeatures.noviceFeatures}
      />
      {character.level >= 8 && (
        <FeatureSection
          label="Veteran Features"
          genericFeatures={genericFeatures.veteranFeatures}
        />
      )}
    </>
  );
};

export default GenericFeaturePicker;
