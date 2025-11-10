import { gql } from "@apollo/client";
import DAMAGE_FRAGMENT from "./Damage.fragment";

const BEAST_FRAGMENT = gql`
  ${DAMAGE_FRAGMENT}
  fragment BeastFragment on BeastForm {
    abilities {
      text
      title
      type
    }
    damage {
      ...DamageFragment
    }
    health {
      base
      perLevel
    }
    armor
    size
    slug
    speed {
      speed
      type
    }
    stats {
      agility
      heart
      intellect
      mettle
    }
    title
  }
`;

export default BEAST_FRAGMENT;
