import graphQLLineage from "@/app/components/Lineage";
import SelectFromCards from "@/app/components/SelectFromCards";
import { option_type } from "@/app/enums";
import PlayerCharacter from "@/app/utils/PlayerCharacter";
import { characterLineageListBuilder } from "@/app/utils/CharacterLineage";
import lineages_json from "@/public/rules_json/lineages/lineages.json";
import { Dispatch, SetStateAction } from "react";

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
        currentCharacter.characterLineage
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
