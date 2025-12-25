import GenericFeature from "../utils/GenericFeature";
import TextBlock from "./blocks/TextBlock";

export const FeatureLi = ({ feature }: { feature: GenericFeature }) => {
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
                if (!choice || !choice.choice) return;
                if ("slug" in choice.choice) {
                  return (
                    <li key={choice.choice.slug}>
                      <TextBlock text={choice.choice.text} inline={true} />
                    </li>
                  );
                } else {
                  return (
                    <li key={choice.choice.text}>
                      <span className="text-amber-600">- </span>
                      <TextBlock text={[choice.choice]} inline={true} />
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
  genericFeatures: GenericFeature[];
};

const GenericFeatures = ({ genericFeatures }: genericFeaturesProps) => {
  return (
    <div className="divide-slate-700 divide-y">
      {genericFeatures.map((feature: GenericFeature) => {
        return <FeatureLi feature={feature} key={feature.slug} />;
      })}
    </div>
  );
};

export default GenericFeatures;
