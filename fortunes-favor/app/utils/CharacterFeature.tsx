import { Choice } from "@/app/utils/FieldTypes";
import { rule_type, findEnum, action_type } from "../enums";
import {
  CharacterClassFeature,
  FeatureWithoutChoices,
  RuleText,
} from "./graphQLtypes";
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
      feature_data.choices,
      feature_data.chooseNum
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
    this.choices = [];
    this.chooseNum = feature_data.chooseNum;
    feature_data.simpleChoices?.forEach((choice: RuleText) => {
      if (choice.text) this.choices.push(choice);
    });
    feature_data.complexChoices?.forEach((choice: FeatureWithoutChoices) => {
      if (choice.title != null) {
        this.choices.push(choice);
      }
    });
  }
}
