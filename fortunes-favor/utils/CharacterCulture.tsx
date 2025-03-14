import { CharacterTrait } from "./CharacterTrait";

export default class CharacterCulture {
  title: string;
  slug: string;
  desc: string;
  lang: string;
  stat: string;
  features: [CharacterTrait];
  constructor(json: any) {
    this.title = json.title;
    this.slug = json.slug;
    this.desc = json.description;
    this.lang = json.languages;
    this.stat = json.stat;
    if (json.traits) {
      this.features = json.traits.map((t: any) => {
        return new CharacterTrait(t);
      });
    } else {
      this.features = [new CharacterTrait({ title: "Test", text: "Dummy" })];
    }
  }
}

export const characterCultureListBuilder = (
  cultures_json: Array<any>,
): CharacterCulture[] => {
  let cultures: CharacterCulture[] = [];
  cultures_json.forEach((culture) => {
    cultures.push(new CharacterCulture(culture));
  });
  return cultures;
};
