import { RuleType } from "./enums";
import { TextField } from "./FieldTypes";
import { GenericRule } from "./graphQLtypes";

export default class RuleData implements GenericRule {
  readonly title: string;
  readonly slug: string;
  ruleType: RuleType;
  text: TextField[];
  subRules: RuleData[];
  lists: { label?: string; items: string[] }[];
  shortText?: string;
  img?: {
    target: string;
    style?: string;
  };

  constructor(
    title: string,
    slug: string,
    ruleType: RuleType,
    text: TextField[],
    rules: RuleData[],
    lists: { label?: string; items: string[] }[],
    shortText?: string,
    img?: {
      target: string;
      style?: string;
    },
  ) {
    this.title = title;
    this.slug = slug;
    this.ruleType = ruleType;
    this.text = text;
    this.subRules = rules;
    this.lists = lists;
    this.shortText = shortText;
    this.img = img;
  }
}
