import { field_options } from "../enums"

export type field_type = {
    type: field_options;
    title?: string;
    slug?: string;
    text?: string;
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
    console.log("creating field for ", field)
    switch(field.type){
        case field_options.Rule:
            return(
            <>
            <div className={rulesTitleClass}>
                {field.title}
            </div>
                <div>
                    {field.text !== undefined && 
                    TextRule(field.text)}
                </div>
                <div>
                    {field.rules !== undefined &&
                    field.rules.map((f)=> <Field field={f} depth={depth+1}></Field>)
                    }
                </div>
            </>
            )

        default:
            return(
            <>
                Error reading the type from field
            </>
            )
    }

}

const TextRule = (text: string) => {
    return(
        <div>{text}</div>
    )
}

export default Field;