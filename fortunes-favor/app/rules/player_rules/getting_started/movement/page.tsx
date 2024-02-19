import RuleField, { FieldType, fieldCreator } from "@/app/components/RuleField";
import movement from "@/public/rules_json/core_rules/movement.json";

function CharacterResources() {
  console.log(movement);
  let r: FieldType | null = fieldCreator(movement);
  return (
    <div className="CharacterResources">
      {r !== null && <RuleField field={r}></RuleField>}
    </div>
  );
}

export default CharacterResources;
