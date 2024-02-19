import RuleField, { FieldType, fieldCreator } from "@/app/components/RuleField";
import combat from "@/public/rules_json/core_rules/Combat.json";

function CharacterResources() {
  console.log(combat);
  let r: FieldType | null = fieldCreator(combat);
  return (
    <div className="CharacterResources">
      {r !== null && <RuleField field={r}></RuleField>}
    </div>
  );
}

export default CharacterResources;
