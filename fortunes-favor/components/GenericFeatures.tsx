import { TextField } from "../utils/FieldTypes";
import GenericFeatureData from "../utils/GenericFeatureData";
import TextBlock from "./blocks/TextBlock";

export const FeatureLi = ({ feature }: { feature: GenericFeatureData }) => {
  return (
    <div
      className="py-2 px-5 even:bg-slate-300 dark:even:bg-slate-800"
      key={feature.title}
    >
      <span className="font-semibold">{feature.title}</span>
      <span>
        &nbsp;- <TextBlock text={feature.text} inline={true} />
      </span>
      {feature.choices && (
        <>
          <div className="ml-5 mt-2">
            <ul>
              {feature.choices.map((choice) => {
                if (choice instanceof TextField) {
                  return (
                    <li key={choice.text}>
                      <span className="text-amber-600">- </span>
                      {choice.text}
                    </li>
                  );
                } else if (typeof choice === "string") {
                  return (
                    <li key={choice}>
                      <span className="text-amber-600">- </span>
                      {choice}
                    </li>
                  );
                } else if ("slug" in choice) {
                  return (
                    <li key={choice.slug}>
                      <TextBlock text={choice.text} inline={true} />
                    </li>
                  );
                }
              })}
            </ul>
          </div>
          {feature.multiSelect && (
            <div className="mt-2 italic text-slate-600 dark:text-slate-300">
              You can select this multiple times, choosing a different option
              each time.
            </div>
          )}
        </>
      )}
    </div>
  );
};

type genericFeaturesProps = {
  generic_feature_data: GenericFeatureData[];
};

const GenericFeatures = ({ generic_feature_data }: genericFeaturesProps) => {
  return (
    <div className="divide-slate-700 divide-y">
      {generic_feature_data.map((feature: GenericFeatureData) => {
        return <FeatureLi feature={feature} key={feature.title} />;
      })}
    </div>
  );
};

export default GenericFeatures;
