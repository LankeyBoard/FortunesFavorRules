import { size_options, findEnum } from "../enums"
class trait {
    title: string;
    text: string;
    constructor(json: any){
        this.title = json.title;
        this.text = json.text;
    }
}
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
            <div>
            <span className="text-lg font-semibold">Traits</span>
                <div className="px-3 border-amber-800 border-l-2 space-y-1">
                {l.traits.map(t => {
                    return(
                        <div>
                            <span className="font-semibold">{t.title} - </span>
                            <span>{t.text}</span>
                        </div>
                    )
                })}
                </div>
            </div>
            {l.options && 
            <div>
                <span className="text-lg font-semibold">{l.title} options</span>
                <div className="px-3 border-amber-800 border-l-2 space-y-1">
                {l.options.map(t => {
                    return(
                        <div>
                            <span className="font-semibold">{t.title} - </span>
                            <span>{t.text}</span>
                        </div>
                    )
                })}
                </div>
            </div>
            }
        </div>
    )
}

export default Lineage;