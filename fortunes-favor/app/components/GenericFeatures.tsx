import GenericFeatureData from "../utils/GenericFeatureData";
import SlugLinker from "./blocks/SlugLinker";

const Feature = ({ feature }: { feature: GenericFeatureData }) => {
  return (
    <div
      className="py-2 px-5 even:bg-slate-300 dark:even:bg-slate-800"
      key={feature.title}
    >
      <span className="font-semibold">{feature.title}</span>
      <span>
        &nbsp;-{" "}
        {feature.text.map((text) => (
          <SlugLinker key={text.text} text={text.text} />
        ))}
      </span>
      {feature.options && (
        <>
          <div className="ml-5 mt-2">
            <ul>
              {feature.options.map((text) => {
                return (
                  <li key={text}>
                    <span className="text-amber-600">- </span>
                    {text}
                  </li>
                );
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
        return <Feature feature={feature} key={feature.title} />;
      })}
    </div>
  );
};

export default GenericFeatures;
