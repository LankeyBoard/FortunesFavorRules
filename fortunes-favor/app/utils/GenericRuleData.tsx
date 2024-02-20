import { rule_type } from "../enums";
import { TextField } from "./FieldTypes";
import { GenericRule } from "./graphQLtypes";

export default class RuleData implements GenericRule {
  readonly title: string;
  readonly slug: string;
  ruleType: rule_type;
  text: TextField[];
  rules: RuleData[];
  list: string[];
  shortText?: string;

  constructor(
    title: string,
    slug: string,
    ruleType: rule_type,
    text: TextField[],
    rules: RuleData[],
    list: string[],
    shortText?: string
  ) {
    this.title = title;
    this.slug = slug;
    this.ruleType = ruleType;
    this.text = text;
    this.rules = rules;
    this.list = list;
    this.shortText = shortText;
  }
}
