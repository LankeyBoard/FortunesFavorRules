import { gql } from "@apollo/client";

const CREATE_CHARACTER_MUTATION = gql`
  mutation CreateCharacter($characterInputs: CharacterInput!) {
    createCharacter(input: $characterInputs) {
      id
    }
  }
`;

export default CREATE_CHARACTER_MUTATION;
