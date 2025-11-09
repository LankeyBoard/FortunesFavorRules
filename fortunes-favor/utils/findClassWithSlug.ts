import { CharacterClass } from "../schema/types.generated";

const findClass = (characterClasses: CharacterClass[], slug: string) => {
  const flattenedClasses = characterClasses.flatMap((c) =>
    c.variants ? [c, ...c.variants] : [c],
  );
  console.log("flattenedClasses", flattenedClasses);
  const characterClass = flattenedClasses.find((c) => {
    if (!c) return false;
    return c.slug.toUpperCase() === slug.toUpperCase();
  });
  if (!characterClass) {
    throw new Error(`${slug} not found in classes`);
  }
  return characterClass;
};

export default findClass;
