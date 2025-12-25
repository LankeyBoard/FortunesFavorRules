import convertToChoices from "@/utils/convertToChoices";
import GenericFeature from "@/utils/GenericFeature";
import GenericFeatureData from "@/utils/types/genericFeatureData";
import { Suspense } from "react";
import GenericFeatures from "../GenericFeatures";

type GenericFeaturePageProps = {
  data: GenericFeatureData;
  title?: string;
};

const GenericFeaturePage = ({ data, title }: GenericFeaturePageProps) => {
  const convertedFeatures = data.universalFeatures.map((feature) => {
    return new GenericFeature(
      feature.title,
      feature.slug,
      feature.ruleType,
      feature.text,
      feature.multiSelect,
      convertToChoices(feature.choices),
      feature.chooseNum,
    );
  });
  return (
    <div className="grid grid-cols-1 divide-y-2 divide-slate-500 mb-2">
      <div id="novice_features">
        {title && (
          <div className="text-3xl tracking-wide font-bold py-4 px-5 bg-fuchsia-300 dark:bg-fuchsia-900">
            {title}
          </div>
        )}
        <Suspense>
          <GenericFeatures genericFeatures={convertedFeatures} />
        </Suspense>
      </div>
    </div>
  );
};

export default GenericFeaturePage;
