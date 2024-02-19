import RuleField, { FieldType, fieldCreator } from "@/app/components/RuleField";
import build_a_character from "@/public/rules_json/core_rules/building_a_character.json";

function BuildACharacter() {
  console.log(build_a_character);
  let r: FieldType | null = fieldCreator(build_a_character);
  return (
    <div className="BuildACharacter">
      {r !== null && <RuleField field={r}></RuleField>}
    </div>
  );
}

export default BuildACharacter;
