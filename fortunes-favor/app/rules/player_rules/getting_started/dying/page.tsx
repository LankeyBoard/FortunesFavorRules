import RuleField, { FieldType, fieldCreator } from "@/app/components/RuleField";
import dying from "@/public/rules_json/core_rules/exhausted_dying_last_stand_healing.json";

function CharacterResources() {
  console.log(dying);
  let r: FieldType | null = fieldCreator(dying);
  return (
    <div className="CharacterResources">
      {r !== null && <RuleField field={r}></RuleField>}
    </div>
  );
}

export default CharacterResources;
