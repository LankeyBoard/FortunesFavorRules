import { gql } from "@apollo/client";

const MONSTER_FRAGMENT = gql`
  fragment MonsterFragment on Monster {
    __typename
    name
    size
    description {
      text
      type
    }
    Stats {
      agility
      heart
      intellect
      mettle
    }
    armor
    damage {
      count
      dice
      flat
      stat
      type
    }
    health
    hit
    img {
      style
      target
    }
    level
    range {
      max
      min
    }
    speed {
      speed
      type
    }
    type
    tags
    features {
      actionType
      featureType
      slug
      title
      text {
        text
        type
      }
    }
  }
`;
export default MONSTER_FRAGMENT;
