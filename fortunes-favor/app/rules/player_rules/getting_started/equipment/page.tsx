import RuleField, { FieldType, fieldCreator } from "@/app/components/RuleField";
import equipment from "@/public/rules_json/core_rules/equipment.json";

function CharacterResources() {
  console.log(equipment);
  let r: FieldType | null = fieldCreator(equipment);
  return (
    <div className="CharacterResources">
      {r !== null && <RuleField field={r}></RuleField>}
    </div>
  );
}

export default CharacterResources;
