import { SizeOptions, findEnumValue } from "./enums";
import { CharacterTrait } from "./CharacterTrait";

export default class CharacterLineage {
  title: string;
  slug: string;
  desc: string;
  size: SizeOptions | SizeOptions[];
  speeds: [{ type: string; speed: number; source: string }];
  stat: string;
  features: [CharacterTrait];
  constructor(json: any) {
    this.title = json.title;
    this.slug = json.slug;
    this.desc = json.description;
    if (typeof json.size === "string") {
      const s = findEnumValue(json.size, SizeOptions);
      this.size = SizeOptions.ERROR;
      if (s) {
        this.size = s;
      } else {
        console.error("Error matching size %s in json file", json.size);
      }
    } else {
      let sizeList: SizeOptions[] = [];
      json.size.forEach((sizeOpt: string) => {
        const s = findEnumValue(sizeOpt, SizeOptions);
        sizeList.push(s);
      });
      this.size = sizeList;
    }
    this.speeds = json.speeds;
    this.stat = json.stat;
    this.features = json.traits.map((t: any) => {
      return new CharacterTrait(t);
    });
  }
}

export const characterLineageListBuilder = (
  lineages_json: Array<any>,
): CharacterLineage[] => {
  let lineages: CharacterLineage[] = [];
  lineages_json.forEach((lineage) => {
    lineages.push(new CharacterLineage(lineage));
  });
  return lineages;
};
