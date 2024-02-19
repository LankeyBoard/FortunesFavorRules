import RuleField, { FieldType, fieldCreator } from "@/app/components/RuleField";
import data from "@/public/rules_json/core_rules/what_makes_up_a_character.json";

function WhatMakesACharacter() {
  console.log(data);
  let r: FieldType | null = fieldCreator(data);
  return (
    <div className="CharacterResources">
      {r !== null && <RuleField field={r}></RuleField>}
    </div>
  );
}

export default WhatMakesACharacter;
