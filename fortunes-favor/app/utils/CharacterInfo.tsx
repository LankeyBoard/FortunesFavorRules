import CharacterClass from "./CharacterClass";
import CharacterCulture from "./CharacterCulture";
import CharacterLineage from "./CharacterLineage";

export default class CharacterInfo {
    name: string | undefined;
    level: number | undefined;
    characterClass: CharacterClass | undefined;
    characterCulture: CharacterCulture | undefined;
    characterLineage: CharacterLineage | undefined;
}