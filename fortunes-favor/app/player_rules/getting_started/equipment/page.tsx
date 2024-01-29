import Field, {field_type, fieldCreator} from "../../../components/Field";
import equipment from "../../../../public/rules_json/core_rules/equipment.json"

function CharacterResources(){
    console.log(equipment)
    let r: field_type|null = fieldCreator(equipment);
    return (
    <div className="CharacterResources">
        {r !== null &&
        <Field field={r}></Field>
        }
    </div>
    );
}

export default CharacterResources;