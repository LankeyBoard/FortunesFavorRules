import RuleField, { FieldType, fieldCreator } from "@/app/components/RuleField";
import character_resources from "@/public/rules_json/core_rules/character_resources.json";

function CharacterResources() {
  console.log(character_resources);
  let r: FieldType | null = fieldCreator(character_resources);
  return (
    <div className="CharacterResources">
      {r !== null && <RuleField field={r}></RuleField>}
    </div>
  );
}

export default CharacterResources;
