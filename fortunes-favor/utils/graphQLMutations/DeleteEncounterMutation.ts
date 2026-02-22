import { gql } from "@apollo/client";

export type DeleteEncounterData = {
  deleteEncounter: boolean;
};

const DELETE_ENCOUNTER_MUTATION = gql`
  mutation DeleteEncounter($id: ID!) {
    deleteEncounter(id: $id)
  }
`;

export default DELETE_ENCOUNTER_MUTATION;
