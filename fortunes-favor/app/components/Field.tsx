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
type fieldProps = {
    field: field_type;
    depth?: number;
}
const Field = ({field, depth=1}: fieldProps) => {
    let rulesTitleClass = "Rules-header"+depth;
    console.log("creating field for ", field);
    return(
        <>
        <div className={rulesTitleClass}>
            {field.title}
        </div>
        {field.text !== undefined && 
            <div>
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
        {field.rules !== undefined &&
        <div>
            {field.rules.map((f) => <Field field={f} depth={depth+1}></Field>)}
        </div>
        }
        </>
    )

}

export default Field;