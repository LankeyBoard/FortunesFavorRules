import { gql } from "@apollo/client";
import MONSTER_FRAGMENT from "./fragments/monsterFragment";
import {
  RuleText,
  BaseStats,
  Img,
  Damage,
  GenericFeature,
} from "@/utils/graphQLtypes";
import { Speed } from "@/utils/types/types.generated";

enum MonsterType {
  Minion,
  Monster,
  Boss,
}

type Range = {
  min: number;
  max?: number;
};

enum TypenameOptions {
  Monster = "Monster",
  MonsterGroup = "MonsterGroup",
}
export type Monster = {
  _typename: TypenameOptions;
  name: string;
  level: number;
  size: string;
  type: MonsterType;
  description: [RuleText];
  img?: Img;
  health: number;
  currentHealth?: number;
  armor: number;
  Stats: BaseStats;
  speed: [Speed];
  hit: number;
  range: Range;
  damage: Damage;
  tags?: [string];
  features: [GenericFeature];
};

export type MonsterGroup = {
  _typename: TypenameOptions;
  name: string;
  description: [RuleText];
  img?: Img;
  monsters: [Monster];
};

export type MonsterData = {
  allMonsters: [Monster | MonsterGroup];
};

const ALL_MONSTERS_QUERY = gql`
  ${MONSTER_FRAGMENT}
  query AllMonsters {
    allMonsters {
      ... on Monster {
        ...MonsterFragment
      }
      ... on MonsterGroup {
        __typename
        name
        description {
          text
          type
        }
        img {
          style
          target
        }
        monsters {
          ...MonsterFragment
        }
      }
    }
  }
`;
export default ALL_MONSTERS_QUERY;
