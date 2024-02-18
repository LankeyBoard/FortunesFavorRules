import Field, { FieldType, fieldCreator } from "@/app/components/Field";
import data from "@/public/rules_json/core_rules/tests.json";

function Tests() {
  console.log(data);
  let r: FieldType | null = fieldCreator(data);
  return (
    <div className="CharacterResources">
      {r !== null && <Field field={r}></Field>}
    </div>
  );
}

export default Tests;
