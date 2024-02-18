import Field, { FieldType, fieldCreator } from "@/app/components/Field";
import character_resources from "@/public/rules_json/core_rules/character_resources.json";

function CharacterResources() {
  console.log(character_resources);
  let r: FieldType | null = fieldCreator(character_resources);
  return (
    <div className="CharacterResources">
      {r !== null && <Field field={r}></Field>}
    </div>
  );
}

export default CharacterResources;
