import Field, {field_type, fieldCreator} from "@/app/components/Field";
import build_a_character from "@/public/rules_json/core_rules/building_a_character.json"

function BuildACharacter(){
    console.log(build_a_character)
    let r: field_type|null = fieldCreator(build_a_character);
    return (
    <div className="BuildACharacter">
        {r !== null &&
        <Field field={r}></Field>
        }
    </div>
    );
}

export default BuildACharacter;