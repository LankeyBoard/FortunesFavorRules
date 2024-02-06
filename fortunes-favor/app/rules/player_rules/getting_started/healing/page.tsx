import Field, {field_type, fieldCreator} from "@/app/components/Field";
import healing from "@/public/rules_json/core_rules/healing.json"

function CharacterResources(){
    console.log(healing)
    let r: field_type|null = fieldCreator(healing);
    return (
    <div className="CharacterResources">
        {r !== null &&
        <Field field={r}></Field>
        }
    </div>
    );
}

export default CharacterResources;