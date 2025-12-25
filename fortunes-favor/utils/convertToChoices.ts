import { ChoiceData } from "./graphQLQueries/playerCharacterQueries/PlayerCharacterQuery";
import featureChoice, { complexChoice } from "./types/featureChoice";
import Text from "./types/text";
/** *
 @param choices are split choices from the graphQL
 @returns combined choices for other classes to use
 */
const convertToChoices = (choices: ChoiceData[]): featureChoice[] => {
  const combinedChoices = choices.map((c) => {
    // checking for complextChoice.slug because empty complexChoice with _typename come from server
    if (c.complexChoice != null && c.complexChoice.slug)
      return {
        isChosen: c.isChosen,
        choice: c.complexChoice,
      } as featureChoice;
    else if (c.simpleChoice != null && c.simpleChoice.text)
      return {
        isChosen: c.isChosen,
        choice: c.simpleChoice,
      } as featureChoice;
    else
      throw new Error(
        "Choice must include either complexChoice or simpleChoice",
      );
  });
  return combinedChoices.filter((choice) => choice != undefined);
};
export default convertToChoices;
