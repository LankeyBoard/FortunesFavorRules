import { size_options, findEnum } from "../enums";
import { CharacterTrait } from "./CharacterTrait";
import RuleData from "./GenericRuleData";

export default class CharacterLineage {
  title: string;
  slug: string;
  desc: string;
  size: size_options | size_options[];
  speed: number;
  stat: string;
  traits: [CharacterTrait];
  constructor(json: any) {
    this.title = json.title;
    this.slug = json.slug;
    this.desc = json.description;
    if (typeof json.size === "string") {
      const s = findEnum(json.size, size_options);
      this.size = size_options.error;
      if (s) {
        this.size = s;
      } else {
        console.log("Error matching size %s in json file", json.size);
      }
    } else {
      let sizeList: size_options[] = [];
      json.size.forEach((sizeOpt: string) => {
        const s = findEnum(sizeOpt, size_options);
        sizeList.push(s);
      });
      this.size = sizeList;
    }
    this.speed = json.speed;
    this.stat = json.stat;
    this.traits = json.traits.map((t: any) => {
      return new RuleData(
        t.title,
        t.slug,
        t.ruleType || "RULE",
        t.text,
        t.rules,
        t.list
      );
    });
    console.log("Lineage - ", CharacterLineage);
  }
}

export const characterLineageListBuilder = (
  lineages_json: Array<any>
): CharacterLineage[] => {
  let lineages: CharacterLineage[] = [];
  lineages_json.forEach((lineage) => {
    lineages.push(new CharacterLineage(lineage));
  });
  return lineages;
};
