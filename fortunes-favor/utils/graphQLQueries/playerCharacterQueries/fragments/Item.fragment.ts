import { gql } from "@apollo/client";
import USES_FRAGMENT from "./Uses.fragment";
import EFFECT_FRAGMENT from "./Effect.fragment";

export const ITEM_FRAGMENT = gql`
  ${USES_FRAGMENT}
  ${EFFECT_FRAGMENT}
  fragment ItemFragment on Item {
    id
    title
    text {
      text
      type
    }
    isMagic
    rarity
    uses {
      ...UsesFragment
    }
    effects {
      ...EffectFragment
    }
    slots
  }
`;

export default ITEM_FRAGMENT;
