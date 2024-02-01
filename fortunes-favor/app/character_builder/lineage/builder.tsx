import Lineage from "@/app/components/Lineage";
import SelectFromCards from "@/app/components/SelectFromCards";
import CharacterInfo from "@/app/utils/CharacterInfo";
import lineages_json from "@/public/rules_json/lineages/lineages.json"
import { Dispatch, SetStateAction } from "react";

type lineageSelectProps = {
    currentCharacter: CharacterInfo,
    updateCharacter: Dispatch<SetStateAction<CharacterInfo>>
}

function LineageSelectBuilder({currentCharacter, updateCharacter}: lineageSelectProps){
    const description = "A characters lineage is their biological heratige. Usually lineage is due to a characters parents lineage, but in some cases, such as the Chimeric, it's possible to have a different lineage from ones parents. Sometimes a characters lineage and culture are intertwined, but this is not always the case."
    return(
        <>
        <SelectFromCards options={lineages_json.list} popoutInner={Lineage} optionsDescription={description}/>
        </>
       
    )
}

export default LineageSelectBuilder;