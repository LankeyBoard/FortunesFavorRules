import { gql } from "@apollo/client";

const ENCOUNTER_MONSTER_FRAGMENT = gql`
  fragment EncounterMonsterFragment on EncounterMonster {
    name
    level
    size
    type
    description {
      text
      type
    }
    img {
      target
      style
    }
    maxHealth
    currentHealth
    armor
    Stats {
      mettle
      agility
      heart
      intellect
    }
    speed {
      type
      speed
    }
    hit
    range {
      min
      max
    }
    damage {
      dice
      count
      stat
      type
      flat
    }
    tags
    features {
      title
      slug
      href
      shortTitle
      staminaCost
      costsFortunesFavor
      actionType
      ruleType
      text {
        text
        type
      }
      shortText
      multiSelect
      chooseNum
      featureType
      isVariant
      img {
        target
        style
      }
    }
  }
`;

const ENCOUNTER_FRAGMENT = gql`
  ${ENCOUNTER_MONSTER_FRAGMENT}
  fragment EncounterFragment on Encounter {
    id
    title
    description
    createdBy {
      id
      name
      email
    }
    createdAt
    updatedAt
    monsters {
      ...EncounterMonsterFragment
    }
  }
`;

export { ENCOUNTER_MONSTER_FRAGMENT };
export default ENCOUNTER_FRAGMENT;
