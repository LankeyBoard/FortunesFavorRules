import SelectFromCards from "@/components/SelectFromCards";
import { option_type } from "@/utils/enums";
import PlayerCharacter from "@/utils/PlayerCharacter";
import { characterLineageListBuilder } from "@/utils/CharacterLineage";
import lineages_json from "@/public/rules_json/lineages/lineages.json";
import { Dispatch, SetStateAction } from "react";
import Lineage from "@/components/Lineage";

type lineageSelectProps = {
  currentCharacter: PlayerCharacter;
  updateCharacter: Dispatch<SetStateAction<PlayerCharacter>>;
};

function LineageSelectBuilder({
  currentCharacter,
  updateCharacter,
}: lineageSelectProps) {
  const description =
    "A characters lineage is their biological heratige. Usually lineage is due to a characters parents lineage, but in some cases, such as the Chimeric, it's possible to have a different lineage from ones parents. Sometimes a characters lineage and culture are intertwined, but this is not always the case.";
  const lineages = characterLineageListBuilder(lineages_json.list);
  return (
    <div
      className={
        currentCharacter.lineage
          ? "border-t-emerald-600 border-t-8 px-10"
          : "border-t-amber-800 border-t-8 px-10"
      }
    >
      <SelectFromCards
        optionType={option_type.lineage}
        options={lineages}
        popoutInner={Lineage}
        optionsDescription={description}
        updateCharacter={updateCharacter}
        currentCharacter={currentCharacter}
      />
    </div>
  );
}

export default LineageSelectBuilder;
