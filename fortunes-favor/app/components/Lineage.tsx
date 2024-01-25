import { size_options, findEnum } from "../enums"
import Traits from "./Traits"
import { trait } from "./blocks/Trait";

class lineage {
    title: string;
    slug: string;
    desc: string;
    size: size_options | size_options[];
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
        <div id={l.slug} className="mb-6">
            <div className="my-4 text-2xl tracking-wide">
                {l.title}
            </div>
            <div className="italic" >
                {l.desc}
            </div>
            <div>
                <span className="font-semibold">Size - </span> {typeof l.size === "string"
                ? <span className="capitalize">{l.size.toLocaleLowerCase()}</span> 
                : l.size.map((s) => {return(<span className="capitalize">{s.toLocaleLowerCase()} </span>)})}
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