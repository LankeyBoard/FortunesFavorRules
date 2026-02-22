import { gql } from "@apollo/client";
import ENCOUNTER_FRAGMENT from "./sharedFragments/encounterFragment";
import { EncounterData } from "@/utils/graphQLtypes";

export type EncounterQueryData = {
  encounter: EncounterData;
};

const ENCOUNTER_QUERY = gql`
  ${ENCOUNTER_FRAGMENT}
  query GetEncounter($id: ID!) {
    encounter(id: $id) {
      ...EncounterFragment
    }
  }
`;

export default ENCOUNTER_QUERY;
