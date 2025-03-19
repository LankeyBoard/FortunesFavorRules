import { RuleType } from "./enums";
import { FeatureChoices, GenericFeature, RuleText } from "./graphQLtypes";

export default class GenericFeatureData implements GenericFeature {
  title: string;
  slug: string;
  ruleType: RuleType;
  text: RuleText[];
  shortText?: string;
  multiSelect: boolean;
  choices: FeatureChoices[];
  chooseNum: number;

  constructor(
    title: string,
    slug: string,
    ruleType: RuleType,
    text: RuleText[],
    multiSelect: boolean,
    choices: FeatureChoices[],
    chooseNum: number,
    shortText?: string,
  ) {
    this.title = title;
    this.slug = slug;
    this.ruleType = ruleType;
    this.text = text;
    this.shortText = shortText;
    this.multiSelect = multiSelect;
    this.choices = choices;
    this.chooseNum = chooseNum;
  }
}
