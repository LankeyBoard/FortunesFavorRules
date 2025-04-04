import { gql } from "@apollo/client";

const UPDATE_CHARACTER_MUTATION = gql`
  mutation UpdateCharacter($id: ID!, $characterInputs: CharacterInput!) {
    updateCharacter(id: $id, input: $characterInputs) {
      name
      items {
        id
        title
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
      featureChoiceSlugs
    }
  }
`;

export default UPDATE_CHARACTER_MUTATION;
