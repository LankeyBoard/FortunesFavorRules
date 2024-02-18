import { TextField, Choice } from "@/app/utils/FieldTypes";
import { field_options, findEnum } from "../enums";
import RuleText from "./Rules";
import { FieldType } from "../components/Field";

export default class CharacterFeature extends RuleText {
  level: number;
  name: string;
  slug: string;
  stamina?: number;
  ff?: number;
  type: field_options;
  fields: TextField[];
  choices?: FieldType[];
  constructor(feature_data: any) {
    super(feature_data.title, feature_data.slug);
    this.level = feature_data.level;
    this.name = feature_data.title;
    this.slug = feature_data.slug;
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
