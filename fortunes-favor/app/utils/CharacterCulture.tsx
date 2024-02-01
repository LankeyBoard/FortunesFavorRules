import { CharacterTrait } from "./CharacterTrait";

export default class CharacterCulture {
    title: string;
    slug: string;
    desc: string;
    lang: string;
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
        this.lang = json.lang;
        this.stat = json.stat;
        if(json.traits){
            this.traits = json.traits.map((t: any) => {
                return new CharacterTrait(t);
            });
        }
        else {
            this.traits = [new CharacterTrait({title: "Test", text: "Dummy"})];
        }
        if(json.options){
            this.options = json.options.map((o: any) => {
                return new CharacterTrait(o);
            })
        }
        console.log("Culture - ", this);
    }
}