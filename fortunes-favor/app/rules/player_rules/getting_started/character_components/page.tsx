import Field, { FieldType, fieldCreator } from "@/app/components/Field";
import data from "@/public/rules_json/core_rules/what_makes_up_a_character.json";

function WhatMakesACharacter() {
  console.log(data);
  let r: FieldType | null = fieldCreator(data);
  return (
    <div className="CharacterResources">
      {r !== null && <Field field={r}></Field>}
    </div>
  );
}

export default WhatMakesACharacter;
