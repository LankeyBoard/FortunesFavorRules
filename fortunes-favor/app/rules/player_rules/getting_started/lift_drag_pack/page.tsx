import Field, {field_type, fieldCreator} from "@/app/components/Field";
import lift from "@/public/rules_json/core_rules/lift_drag_pack.json"

function CharacterResources(){
    console.log(lift)
    let r: field_type|null = fieldCreator(lift);
    return (
    <div className="CharacterResources">
        {r !== null &&
        <Field field={r}></Field>
        }
    </div>
    );
}

export default CharacterResources;