import Field, {field_type, fieldCreator} from "../../../components/Field";
import data from "../../../../public/rules_json/core_rules/reference.json"

function Reference(){
    console.log(data)
    let r: field_type|null = fieldCreator(data);
    return (
    <div className="CharacterResources">
        {r !== null &&
        <Field field={r}></Field>
        }
    </div>
    );
}

export default Reference;