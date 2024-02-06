import { size_options, findEnum } from "../enums";
import { CharacterTrait } from "./CharacterTrait";

export default class CharacterLineage {
    title: string;
    slug: string;
    desc: string;
    size: size_options | size_options[];
    speed: number;
    stat: string;
    traits: [
        CharacterTrait
    ];
    options?:[
        CharacterTrait
    ]
    constructor(json: any){
        this.title = json.title;
        this.slug = json.slug;
        this.desc = json.desc;
        if(typeof json.size === "string"){
            const s = findEnum(json.size, size_options);
            this.size = size_options.error;
            if(s){
                this.size = s;
            }
            else{
                console.log("Error matching size %s in json file", json.size);
            }
        }
        else{
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
            return new CharacterTrait(t);
        });
        if(json.options){
            this.options = json.options.map((o: any) => {
                return new CharacterTrait(o);
            })
        }
        console.log("Lineage - ", CharacterLineage);
    }
}

export const characterLineageListBuilder = (lineages_json: Array<any>): CharacterLineage[] => {
    let cultures: CharacterLineage[] = [];
    lineages_json.forEach((lineage)=> {
        cultures.push(new CharacterLineage(lineage))
    });
    return cultures;
}