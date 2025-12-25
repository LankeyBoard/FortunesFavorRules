import { ActionType, RuleType } from "../enums";
import { ChoiceData } from "../graphQLQueries/playerCharacterQueries/PlayerCharacterQuery";
import Text from "./text";
import { FeatureType } from "./types.generated";

type GenericFeatureData = {
  universalFeatures: {
    actionType: ActionType;
    choices: ChoiceData[];
    chooseNum: number;
    featureType: FeatureType;
    costsFortunesFavor: boolean;
    href: string;
    ruleType: RuleType;
    multiSelect: boolean;
    shortText?: string;
    shortTitle?: string;
    slug: string;
    staminaCost: number;
    title: string;
    text: Text[];
  }[];
};
export default GenericFeatureData;
