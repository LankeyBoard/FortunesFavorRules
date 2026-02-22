import { gql } from "@apollo/client";
import ENCOUNTER_FRAGMENT from "../graphQLQueries/sharedFragments/encounterFragment";
import { EncounterData } from "@/utils/graphQLtypes";

export type CreateEncounterData = {
  createEncounter: EncounterData;
};

const CREATE_ENCOUNTER_MUTATION = gql`
  ${ENCOUNTER_FRAGMENT}
  mutation CreateEncounter($input: EncounterInput) {
    createEncounter(input: $input) {
      ...EncounterFragment
    }
  }
`;

export default CREATE_ENCOUNTER_MUTATION;
