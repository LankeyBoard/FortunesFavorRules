import { field_options } from "../enums"

export type field_type = {
    type: field_options;
    title?: string;
    slug?: string;
    text?: string;
    eg?: string;
    list?: field_type[];
    rules?: field_type[];
}


export function fieldCreator(json: any) {
    if("type" in json){
        if(Object.values(field_options).includes(json.type)){
            let f: field_type = {type: json.type};
            f = json;
            console.log("Field creator",f)
            return f;
        }
    }
    console.log("Error creating field from json", json);
    return null;
}

const titleStyler =(depth: number) => {
    switch(depth) {
        case 1:
            return("text-3xl tracking-wide font-bold py-4 px-1");
        case 2:
            return("my-4 mx-2 text-2xl tracking-wide");
        case 3:
            return("text-lg p-2 font-semibold")
    }
}

type fieldProps = {
    field: field_type;
    depth?: number;
}
const Field = ({field, depth=1}: fieldProps) => {
    return(
        <div id={field.slug}>
            <div className={titleStyler(depth)}>
                {field.title}
            </div>
            <div className="pb-2 mx-5">
                {field.text !== undefined && 
                    <div className="mb-2">
                        {field.text}
                    </div>
                }
                {field.eg !== undefined && 
                    <div>
                        <p>e.g. <i>{field.eg}</i></p>
                    </div>
                }
                {field.list &&
                    <ul>
                        {field.list.map((f)=> <li key={f.slug}><Field field={f} depth={depth+1}></Field></li>)}
                    </ul>
                }
            </div>
            <div className={depth>1?"mx-4 bg-teal-900 border-white-200 border-l-2":""}>
                {field.rules !== undefined &&
                <div className="">
                    {field.rules.map((f) => <Field field={f} depth={depth+1}></Field>)}
                </div>
                }
            </div>
        </div>
    )

}

export default Field;