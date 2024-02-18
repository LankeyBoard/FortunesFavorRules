import Field, { FieldType, fieldCreator } from "@/app/components/Field";
import movement from "@/public/rules_json/core_rules/movement.json";

function CharacterResources() {
  console.log(movement);
  let r: FieldType | null = fieldCreator(movement);
  return (
    <div className="CharacterResources">
      {r !== null && <Field field={r}></Field>}
    </div>
  );
}

export default CharacterResources;
