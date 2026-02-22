import { gql } from "@apollo/client";
import ENCOUNTER_FRAGMENT from "../graphQLQueries/sharedFragments/encounterFragment";
import { EncounterData } from "@/utils/graphQLtypes";

export type UpdateEncounterData = {
  updateEncounter: EncounterData;
};

const UPDATE_ENCOUNTER_MUTATION = gql`
  ${ENCOUNTER_FRAGMENT}
  mutation UpdateEncounter($id: ID!, $input: EncounterInput) {
    updateEncounter(id: $id, input: $input) {
      ...EncounterFragment
    }
  }
`;

export default UPDATE_ENCOUNTER_MUTATION;
