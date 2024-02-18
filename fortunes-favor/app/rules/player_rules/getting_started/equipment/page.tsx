import Field, { FieldType, fieldCreator } from "@/app/components/Field";
import equipment from "@/public/rules_json/core_rules/equipment.json";

function CharacterResources() {
  console.log(equipment);
  let r: FieldType | null = fieldCreator(equipment);
  return (
    <div className="CharacterResources">
      {r !== null && <Field field={r}></Field>}
    </div>
  );
}

export default CharacterResources;
