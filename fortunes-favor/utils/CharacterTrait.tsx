import { RuleType } from "./enums";
import { TextField } from "./FieldTypes";
import {
  FeatureChoices,
  FeatureWithoutChoices,
  GenericFeature,
  RuleText,
} from "./graphQLtypes";

export class CharacterTrait implements GenericFeature {
  title: string;
  text: TextField[];
  slug: string;
  ruleType: RuleType;
  list: string[];
  shortText?: string | undefined;
  multiSelect: boolean;
  choices: FeatureChoices[];
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
    this.choices = [];
    data.simpleChoices?.forEach((choice: RuleText) => {
      if (choice.text) this.choices.push(choice);
    });
    data.complexChoices?.forEach((choice: FeatureWithoutChoices) => {
      if (choice.title != null) {
        this.choices.push(choice);
      }
    });
    this.isVariant = data.isVariant || false;
  }
}
