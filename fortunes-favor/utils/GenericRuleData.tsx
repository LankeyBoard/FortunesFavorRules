import { RuleType } from "./enums";
import { TextField } from "./FieldTypes";
import { GenericRule } from "./graphQLtypes";

export default class RuleData implements GenericRule {
  readonly title: string;
  readonly slug: string;
  ruleType: RuleType;
  text: TextField[];
  subRules: RuleData[];
  list: string[];
  shortText?: string;

  constructor(
    title: string,
    slug: string,
    ruleType: RuleType,
    text: TextField[],
    rules: RuleData[],
    list: string[],
    shortText?: string,
  ) {
    this.title = title;
    this.slug = slug;
    this.ruleType = ruleType;
    this.text = text;
    this.subRules = rules;
    this.list = list;
    this.shortText = shortText;
  }
}
