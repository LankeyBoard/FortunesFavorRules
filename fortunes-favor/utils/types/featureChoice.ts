import Text from "./text";
export type complexChoice = {
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
type featureChoice = {
  isChosen: boolean;
  choice: Text | complexChoice;
};
export default featureChoice;
