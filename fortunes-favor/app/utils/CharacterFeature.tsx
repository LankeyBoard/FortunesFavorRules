import { TextField, Choice } from "@/app/utils/FieldTypes";
import { rule_type, findEnum, action_type } from "../enums";
import RuleData from "./GenericRuleData";
import { CharacterClassFeature, GenericFeature } from "./graphQLtypes";
import GenericFeatureData from "./GenericFeatureData";

export default class CharacterFeatureData
  extends GenericFeatureData
  implements CharacterClassFeature
{
  level: number;
  staminaCost?: number;
  costsFortunesFavor: boolean;
  rules: GenericFeature[];
  actionType?: action_type;
  fields: TextField[];
  choices: GenericFeature[];
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
    this.staminaCost = feature_data.staminaCost;
    this.costsFortunesFavor = feature_data.costsFortunesFavor;
    this.actionType = undefined;
    const at = findEnum(feature_data.actionType, action_type);
    if (at) {
      this.actionType = at;
    } else {
      console.error(
        "Error matching feature type %s in json file",
        feature_data.actionType
      );
    }
    this.fields = feature_data.rules.map(
      (json_field: any) => new TextField(json_field)
    );
    this.rules = feature_data.rules;
    this.choices = feature_data.choices;
  }
}
