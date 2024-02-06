import Field, {field_type, fieldCreator} from "@/app/components/Field";
import movement from "@/public/rules_json/core_rules/movement.json"

function CharacterResources(){
    console.log(movement)
    let r: field_type|null = fieldCreator(movement);
    return (
    <div className="CharacterResources">
        {r !== null &&
        <Field field={r}></Field>
        }
    </div>
    );
}

export default CharacterResources;