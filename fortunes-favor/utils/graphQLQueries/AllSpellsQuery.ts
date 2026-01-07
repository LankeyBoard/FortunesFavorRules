import { gql } from "@apollo/client";
export enum SpellType {
  Arcane,
  Divine,
  Nature,
}
export type SpellQueryData = {
  allSpells: {
    name: string;
    level: number;
    type: [SpellType];
    castingTime: string;
    duration: string;
    range?: string;
    description: string;
  }[];
};
const ALL_SPELLS_QUERY = gql`
  query AllSpells {
    allSpells {
      castingTime
      description
      duration
      level
      name
      range
      type
    }
  }
`;
export default ALL_SPELLS_QUERY;
