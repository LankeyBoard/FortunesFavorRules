import { field_options } from "../enums";
import { TextField } from "./FieldTypes";

export default class Rule {
  readonly title: string;
  readonly slug: string;
  ruleType: field_options;
  text: [TextField];
  rules: [Rule];
  list: [string];
  shortText?: string;

  constructor(
    title: string,
    slug: string,
    ruleType: field_options,
    text: [TextField],
    rules: [Rule],
    list: [string],
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
