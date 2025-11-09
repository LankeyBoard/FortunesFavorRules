import { gql } from "@apollo/client";

const SHIFTER_FORM_FRAGMENT = gql`
  fragment FormFragment on ShifterForm {
    armor {
      stat
      baseArmor
    }
    attackStat
    damage {
      count
      dice
      stat
      type
    }
    features {
      text
      title
    }
    href
    shortTitle
    size
    title
    slug
  }
`;

export default SHIFTER_FORM_FRAGMENT;
