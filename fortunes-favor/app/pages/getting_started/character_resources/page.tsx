import Field, {field_type, fieldCreator} from "../../../components/Field";
import character_resources from "../../../../public/rules_json/core_rules/character_resources.json"

function CharacterResources(){
    console.log(character_resources)
    let r: field_type|null = fieldCreator(character_resources);
    // fetch('./rule_files/core_rules/pitch.json')
    //   .then((response) => response.json())
    //   .then((json) => {
    //     console.log(json);
    //   })
    return (
    <div className="App">
        {r !== null &&
        <Field field={r}></Field>
        }
    </div>
    );
}

export default CharacterResources;