import RuleField, { FieldType, fieldCreator } from "@/app/components/RuleField";
import data from "@/public/rules_json/core_rules/reference.json";

function Reference() {
  console.log(data);
  let r: FieldType | null = fieldCreator(data);
  return (
    <div className="CharacterResources">
      {r !== null && <RuleField field={r}></RuleField>}
    </div>
  );
}

export default Reference;
