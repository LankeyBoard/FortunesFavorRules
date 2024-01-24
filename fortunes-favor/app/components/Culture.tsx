import Traits from "./Traits"
import { trait } from "./blocks/Trait";

class culture {
    title: string;
    slug: string;
    desc: string;
    lang: string;
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
        this.lang = json.lang;
        this.stat = json.stat;
        this.traits = json.traits.map((t: any) => {
            return new trait(t);
        });
        if(json.options){
            this.options = json.options.map((o: any) => {
                return new trait(o);
            })
        }
        console.log("Culture - ", this);
    }
}

const Culture = (json: any) => {
    console.log("Lineage json input: ", json)
    const c = new culture(json.json);
    return(
        <div id={c.slug}>
            <div className="my-4 text-2xl tracking-wide">
                {c.title}
            </div>
            <div className="italic" >
                {c.desc}
            </div>
            <div>
                <span className="font-semibold">Language - </span>{c.lang}
            </div>
            <div>
                <span className="font-semibold">Stat - </span>{c.stat}
            </div>
            <Traits title="Traits" traits={c.traits}/>
            {c.options && 
            <Traits title="Options" traits={c.options}/>
            }
        </div>
    )
}

export default Culture;