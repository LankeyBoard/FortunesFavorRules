import Text from "./text";
export type ComplexChoice = {
  href: string;
  shortTitle: string;
  actionType: string;
  costsFortunesFavor: boolean;
  multiSelect: boolean;
  ruleType: string;
  shortText: string;
  slug: string;
  staminaCost: number;
  title: string;
  text: Text[];
};
type FeatureChoice = {
  isChosen: boolean;
  choice: Text | ComplexChoice;
};
export default FeatureChoice;
