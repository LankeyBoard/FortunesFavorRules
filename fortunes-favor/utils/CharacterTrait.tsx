import convertToChoices from "./convertToChoices";
import { RuleType } from "./enums";
import { TextField } from "./FieldTypes";
import { GenericFeature } from "./graphQLtypes";
import featureChoice from "./types/featureChoice";

export class CharacterTrait implements GenericFeature {
  title: string;
  text: TextField[];
  slug: string;
  ruleType: RuleType;
  list: string[];
  shortText?: string | undefined;
  multiSelect: boolean;
  choices: featureChoice[];
  chooseNum: number;
  isVariant: boolean;
  constructor(data: any) {
    this.title = data.title;
    this.text = data.text;
    this.slug = data.slug;
    this.ruleType = data.ruleType;
    this.list = data.list;
    this.shortText = data.shortText;
    this.multiSelect = data.multiSelect;
    this.chooseNum = data.chooseNum | 0;
    this.choices = convertToChoices(data.choices);
    this.isVariant = data.isVariant || false;
  }
}
