import Field, { FieldType, fieldCreator } from "@/app/components/Field";
import dying from "@/public/rules_json/core_rules/exhausted_dying_last_stand_healing.json";

function CharacterResources() {
  console.log(dying);
  let r: FieldType | null = fieldCreator(dying);
  return (
    <div className="CharacterResources">
      {r !== null && <Field field={r}></Field>}
    </div>
  );
}

export default CharacterResources;
