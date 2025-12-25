import GenericFeature from "./GenericFeature";

/**
 * @param choices - an array of feature choices
 * @returns a string where each value is the slug of the chosen features
 */
const filterChoicesToChosen = (
  choices: GenericFeature["choices"],
): string[] => {
  const chosen = choices
    .filter((c) => c.isChosen)
    .map((c) => {
      if (!c.choice)
        throw new Error("Cannot filter choices without choice field");
      if ("slug" in c.choice) return c.choice.slug;
      else return c.choice.text;
    });
  return chosen.filter((c) => c != undefined);
};

export default filterChoicesToChosen;
