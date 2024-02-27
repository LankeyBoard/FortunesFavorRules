import { rule_type } from "../enums";
import { TextField } from "./FieldTypes";
import { GenericRule } from "./graphQLtypes";

export class CharacterTrait implements GenericRule {
  title: string;
  text: TextField[];
  slug: string;
  ruleType: rule_type;
  rules: CharacterTrait[];
  list: string[];
  shortText?: string | undefined;
  constructor(data: any) {
    this.title = data.title;
    this.text = data.text;
    this.slug = data.slug;
    this.ruleType = data.ruleType;
    this.rules = data.rules;
    this.list = data.list;
    this.shortText = data.shortText;
  }
}
