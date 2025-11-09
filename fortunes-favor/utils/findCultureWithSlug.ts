import { Culture } from "../schema/types.generated";

const findCulture = (cultures: Culture[], slug: string) => {
  const flattenedCultures = cultures.flatMap((c) =>
    c.variants ? [c, ...c.variants] : [c],
  );
  const culture = flattenedCultures.find((culture) => {
    if (!culture) return false;
    return culture.slug.toUpperCase() === slug.toUpperCase();
  });
  if (!culture) {
    throw new Error(`${slug} not found in cultures`);
  }
  return culture;
};

export default findCulture;
