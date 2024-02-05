import Culture from "@/app/components/Culture";
import SelectFromCards from "@/app/components/SelectFromCards";
import { option_type } from "@/app/enums";
import { characterCultureListBuilder } from "@/app/utils/CharacterCulture";
import PlayerCharacter from "@/app/utils/PlayerCharacter";
import cultures_json from "@/public/rules_json/cultures/cultures.json"
import { Dispatch, SetStateAction } from "react";

type cultureSelectProps = {
    currentCharacter: PlayerCharacter,
    updateCharacter: Dispatch<SetStateAction<PlayerCharacter>>
}

function CultureSelectBuilder({currentCharacter, updateCharacter}: cultureSelectProps){
    console.log(cultures_json.list);
    const cultures = characterCultureListBuilder(cultures_json.list);
    const description = "A characters culture represents the society that they are most strongly tied to. Usually this is the culture they were brought up in, but if they've spent enough time in a different region it would make sense for a characters culture to match their new location.";
    return(
        <div className={currentCharacter.characterCulture? "border-t-emerald-600 border-t-8 px-10" :"border-t-amber-800 border-t-8 px-10"}>
            <SelectFromCards optionType={option_type.culture} options={cultures} popoutInner={Culture} optionsDescription={description} updateCharacter={updateCharacter} currentCharacter={currentCharacter}/>
        </div>
    )
}

export default CultureSelectBuilder;