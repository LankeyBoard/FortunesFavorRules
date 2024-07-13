import { Choice } from "@/app/utils/FieldTypes";
import { rule_type, findEnum, action_type } from "../enums";
import { CharacterClassFeature } from "./graphQLtypes";
import GenericFeatureData from "./GenericFeatureData";

export default class CharacterFeatureData
  extends GenericFeatureData
  implements CharacterClassFeature
{
  level: number;
  staminaCost: number;
  costsFortunesFavor: boolean;
  actionType?: action_type;
  constructor(feature_data: any) {
    super(
      feature_data.title,
      feature_data.slug,
      feature_data.ruleType,
      feature_data.text,
      feature_data.list,
      feature_data.shortText,
      feature_data.choices
    );
    this.level = feature_data.level;
    this.staminaCost = feature_data.staminaCost;
    this.costsFortunesFavor = feature_data.costsFortunesFavor;
    this.actionType = undefined;
    if (feature_data.actionType !== null) {
      console.log(feature_data.actionType, feature_data.actionType !== null);
      const at = findEnum(feature_data.actionType, action_type);
      if (at) {
        this.actionType = at;
      } else {
        console.error(
          "Error matching feature [%s] type %s in json file",
          feature_data,
          feature_data.actionType
        );
      }
    }
    this.text = feature_data.text;
    if (this.ruleType === rule_type.Choice && feature_data.choices) {
      this.choices = feature_data.choices.map(
        (json_choice: any) => new Choice(json_choice)
      );
    } else this.choices = [];
  }
}
