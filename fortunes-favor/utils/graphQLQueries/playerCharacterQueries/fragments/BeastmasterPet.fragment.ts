import { gql } from "@apollo/client";

const BEASTMASTER_PET_FRAGMENT = gql`
  fragment BeastmasterPetFragment on BeastmasterPet {
    title
    slug
    description
    beasts {
      abilities {
        text
        title
        type
      }
      damage {
        count
        dice
        stat
        type
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
  }
`;

export default BEASTMASTER_PET_FRAGMENT;
