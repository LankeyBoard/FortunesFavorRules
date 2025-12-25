import { gql } from "@apollo/client";

const UPDATE_CHARACTER_MUTATION = gql`
  mutation UpdateCharacter($id: ID!, $characterInputs: CharacterInput!) {
    updateCharacter(id: $id, input: $characterInputs) {
      name
      items {
        id
        title
        effects {
          target
          operation
          value
          condition
        }
        slots
      }
      level
      mettle
      agility
      heart
      intellect
      coin
      languages
      characterClass {
        title
      }
      characterLineage {
        title
      }
      characterCulture {
        title
      }
      currentHealth
      currentStamina
      maxHealth
      maxStamina
      armorName
      shieldName
      counter
      baseDamage
      rangeMin
      rangeMax
    }
  }
`;

export default UPDATE_CHARACTER_MUTATION;
