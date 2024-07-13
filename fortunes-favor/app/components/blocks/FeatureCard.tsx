import CharacterFeatureData from "@/app/utils/CharacterFeature";
import GenericFeatureData from "@/app/utils/GenericFeatureData";

type FeatureCardProps = {
  feature: GenericFeatureData | CharacterFeatureData;
  source: string;
};

export const FeatureCard = ({ feature, source }: FeatureCardProps) => {
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
    <>
      <div className="pb-3">
        <div className={titleStyle}>
          <h1 className="text-lg font-semibold float-left grow">
            {feature.title}
            {"level" in feature && (
              <span className="ml-2 font-light text-base">
                level {feature.level}
              </span>
            )}
          </h1>
          <h3 className="float-right">{resultType}</h3>
        </div>
        <div className="clear-both">
          {feature.text &&
            feature.text.length > 0 &&
            feature.text.map((t) => {
              return (
                <p key={t.text} className={"line-clamp-3 pl-4 pr-3 pt-3"}>
                  {t.text}
                </p>
              );
            })}
        </div>
      </div>
    </>
  );
};
