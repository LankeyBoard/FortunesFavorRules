import RuleField, { FieldType, fieldCreator } from "@/app/components/RuleField";
import healing from "@/public/rules_json/core_rules/healing.json";

function CharacterResources() {
  console.log(healing);
  let r: FieldType | null = fieldCreator(healing);
  return (
    <div className="CharacterResources">
      {r !== null && <RuleField field={r}></RuleField>}
    </div>
  );
}

export default CharacterResources;
