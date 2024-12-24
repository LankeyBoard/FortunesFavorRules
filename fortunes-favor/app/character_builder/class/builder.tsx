import ClassRule from "@/components/CharacterClass";
import SelectFromCards from "@/components/SelectFromCards";
import { option_type } from "@/utils/enums";
import PlayerCharacter from "@/utils/PlayerCharacter";
import class_list_json from "@/public/rules_json/classes/AllClasses.json";
import { Dispatch, SetStateAction } from "react";

type classSelectProps = {
  currentCharacter: PlayerCharacter;
  updateCharacter: Dispatch<SetStateAction<PlayerCharacter>>;
};

function ClassSelectBuilder({
  currentCharacter,
  updateCharacter,
}: classSelectProps) {
  const classList = class_list_json;
  classList.list.map((json: any) => {
    (json.desc = json.flavor_text), (json.title = json.name);
  });
  const description =
    "A characters class represents their unique set of skills that help them survive and thrive on grand adventures.";
  return (
    <div
      className={
        currentCharacter.class
          ? "border-t-emerald-600 border-t-8 px-10"
          : "border-t-amber-800 border-t-8 px-10"
      }
    >
      <SelectFromCards
        optionType={option_type.class}
        options={classList.list}
        popoutInner={ClassRule}
        optionsDescription={description}
        updateCharacter={updateCharacter}
        currentCharacter={currentCharacter}
      />
    </div>
  );
}

export default ClassSelectBuilder;
