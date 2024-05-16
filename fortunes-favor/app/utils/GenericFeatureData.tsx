import { rule_type } from "../enums";
import { GenericFeature, RuleText } from "./graphQLtypes";

export default class GenericFeatureData implements GenericFeature {
  title: string;
  slug: string;
  ruleType: rule_type;
  text: RuleText[];
  rules?: RuleText[];
  shortText?: string;
  multiSelect: boolean;
  options: string[];

  constructor(
    title: string,
    slug: string,
    ruleType: rule_type,
    text: RuleText[],
    multiSelect: boolean,
    options: string[],
    rules?: RuleText[],
    shortText?: string
  ) {
    this.title = title;
    this.slug = slug;
    this.ruleType = ruleType;
    this.text = text;
    this.rules = rules;
    this.shortText = shortText;
    this.multiSelect = multiSelect;
    this.options = options;
  }
}
