import { gql } from "@apollo/client";
import ENCOUNTER_FRAGMENT from "./sharedFragments/encounterFragment";
import { EncounterData } from "@/utils/graphQLtypes";

export type MyEncountersQueryData = {
  myEncounters: EncounterData[];
};

const MY_ENCOUNTERS_QUERY = gql`
  ${ENCOUNTER_FRAGMENT}
  query GetMyEncounters {
    myEncounters {
      ...EncounterFragment
    }
  }
`;

export default MY_ENCOUNTERS_QUERY;
