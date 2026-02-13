import { ActionType, RuleType } from "./enums";
import FeatureChoice from "./types/featureChoice";
import Text from "./types/text";

export default class GenericFeature {
  title: string;
  slug: string;
  ruleType: RuleType;
  text: Text[];
  shortText?: string;
  multiSelect: boolean;
  choices: FeatureChoice[];
  chooseNum: number;
  isVariant: boolean;
  actionType?: ActionType;
  constructor(
    title: string,
    slug: string,
    ruleType: RuleType,
    text: Text[],
    multiSelect?: boolean,
    choices?: FeatureChoice[],
    chooseNum?: number,
    isVariant?: boolean,
    shortText?: string,
    actionType?: ActionType,
  ) {
    this.title = title;
    this.slug = slug;
    this.ruleType = ruleType;
    this.text = text;
    this.shortText = shortText;
    this.multiSelect = multiSelect ?? false;
    this.choices = choices ? choices.filter((c) => c.choice != undefined) : [];
    this.chooseNum = chooseNum ?? 0;
    this.isVariant = isVariant ?? false;
    this.actionType = actionType;
  }
}
