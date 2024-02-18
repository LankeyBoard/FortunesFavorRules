import Field, { FieldType, fieldCreator } from "@/app/components/Field";
import combat from "@/public/rules_json/core_rules/Combat.json";

function CharacterResources() {
  console.log(combat);
  let r: FieldType | null = fieldCreator(combat);
  return (
    <div className="CharacterResources">
      {r !== null && <Field field={r}></Field>}
    </div>
  );
}

export default CharacterResources;
