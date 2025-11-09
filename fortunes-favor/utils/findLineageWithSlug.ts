import { Lineage } from "../schema/types.generated";

const findLineage = (lineages: Lineage[], slug: string) => {
  const flattenedLineages = lineages.flatMap((l) =>
    l.variants ? [l, ...l.variants] : [l],
  );
  const lineage = flattenedLineages.find((lineage) => {
    if (!lineage) return false;
    return lineage.slug.toUpperCase() === slug.toUpperCase();
  });
  if (!lineage) {
    throw new Error(`${slug} not found in lineages`);
  }
  return lineage;
};

export default findLineage;
