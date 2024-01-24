import { size_options, findEnum } from "../enums"
import Traits from "./Traits"
import { trait } from "./blocks/Trait";

class lineage {
    title: string;
    slug: string;
    desc: string;
    size: size_options;
    speed: number;
    stat: string;
    traits: [
        trait
    ];
    options?:[
        trait
    ]
    constructor(json: any){
        console.log("JSON - ", json.json)
        this.title = json.title;
        this.slug = json.slug;
        this.desc = json.desc;
        const s = findEnum(json.size, size_options);
        this.size = size_options.error;
        if(s){
            this.size = s;
        }
        else{
            console.log("Error matching size %s in json file", json.size);
        }
        this.speed = json.speed;
        this.stat = json.stat;
        this.traits = json.traits.map((t: any) => {
            return new trait(t);
        });
        if(json.options){
            this.options = json.options.map((o: any) => {
                return new trait(o);
            })
        }
        console.log("Lineage - ", lineage);
    }
}

const Lineage = (json: any) => {
    console.log("Lineage json input: ", json)
    const l = new lineage(json.json);
    return(
        <div id={l.slug}>
            <div className="my-4 text-2xl tracking-wide">
                {l.title}
            </div>
            <div className="italic" >
                {l.desc}
            </div>
            <div>
                <span className="font-semibold">Size - </span>{l.size.at(0)?.toUpperCase()+l.size.substring(1).toLocaleLowerCase()}
            </div>
            <div>
                <span className="font-semibold">Speed - </span>{l.speed}
            </div>
            <div>
                <span className="font-semibold">Stat - </span>{l.stat}
            </div>
            <Traits title="Traits" traits={l.traits}/>
            {l.options && 
            <Traits title="Options" traits={l.options}/>
            }
        </div>
    )
}

export default Lineage;