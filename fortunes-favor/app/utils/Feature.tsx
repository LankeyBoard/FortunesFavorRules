import { TextField, Choice } from "@/app/utils/FieldTypes";
import { field_options, findEnum } from "../enums";
import Rule from "./Rules";

export default class CharacterFeature extends Rule {
  level: number;
  stamina?: number;
  ff?: number;
  type: field_options;
  fields: TextField[];
  choices?: Rule[];
  constructor(feature_data: any) {
    super(
      feature_data.title,
      feature_data.slug,
      feature_data.ruleType,
      feature_data.text,
      feature_data.rules,
      feature_data.list,
      feature_data.shortText
    );
    this.level = feature_data.level;
    this.stamina = feature_data.staminaCost;
    this.ff = feature_data.costsFortunesFavor;
    this.type = field_options.error;
    const t = findEnum(feature_data.ruleType, field_options);
    if (t) {
      this.type = t;
    } else {
      console.log(
        "Error matching feature type %s in json file",
        feature_data.type
      );
    }
    this.fields = feature_data.rules.map(
      (json_field: any) => new TextField(json_field)
    );
    if (this.type === field_options.Choice) {
      this.choices = feature_data.choices.map(
        (json_choice: any) => new Choice(json_choice)
      );
    }
  }
}
