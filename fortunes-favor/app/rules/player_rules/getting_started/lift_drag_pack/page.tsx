import RuleField, { FieldType, fieldCreator } from "@/app/components/RuleField";
import lift from "@/public/rules_json/core_rules/lift_drag_pack.json";

function CharacterResources() {
  console.log(lift);
  let r: FieldType | null = fieldCreator(lift);
  return (
    <div className="CharacterResources">
      {r !== null && <RuleField field={r}></RuleField>}
    </div>
  );
}

export default CharacterResources;
