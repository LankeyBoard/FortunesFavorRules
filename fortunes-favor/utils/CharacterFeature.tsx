import { findEnum, ActionType } from "./enums";
import {
  CharacterClassFeature,
  FeatureWithoutChoices,
  RuleText,
} from "./graphQLtypes";
import GenericFeatureData from "./GenericFeatureData";
import { FeatureSource, PlayerCharacterFeature } from "./PlayerCharacter";

export default class CharacterFeatureData
  extends GenericFeatureData
  implements CharacterClassFeature
{
  level: number;
  staminaCost: number;
  costsFortunesFavor: boolean;
  actionType?: ActionType;
  constructor(feature_data: any) {
    super(
      feature_data.title,
      feature_data.slug,
      feature_data.ruleType,
      feature_data.text,
      feature_data.list,
      feature_data.shortText,
      feature_data.choices,
      feature_data.chooseNum,
    );
    this.level = feature_data.level;
    this.staminaCost = feature_data.staminaCost;
    this.costsFortunesFavor = feature_data.costsFortunesFavor;
    this.actionType = undefined;
    if (feature_data.actionType !== null) {
      const at = findEnum(feature_data.actionType, ActionType);
      if (at) {
        this.actionType = at;
      } else {
        console.error(
          "Error matching feature [%s] type %s in json file",
          feature_data,
          feature_data.actionType,
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
  toPlayerFeature = (source: Object) => {
    let f = {
      title: this.title,
      slug: this.slug,
      ruleType: this.ruleType,
      text: this.text,
      multiSelect: this.multiSelect,
      choices: this.choices,
      chooseNum: this.chooseNum,
      shortText: this.shortText,
      level: this.level,
      effects: [],
      chosen: [],
    };
    return new PlayerCharacterFeature(
      this.title,
      findEnum(source.toString(), FeatureSource),
      [],
      this.slug,
      this.ruleType,
      this.text,
      this.multiSelect,
      this.choices,
      [],
      this.chooseNum,
      this.shortText,
      this.level,
    );
  };
}
