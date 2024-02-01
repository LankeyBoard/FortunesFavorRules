import ClassRule from "@/app/components/Class";
import SelectFromCards from "@/app/components/SelectFromCards";
import CharacterInfo from "@/app/utils/CharacterInfo";
import class_list_json from "@/public/rules_json/classes/AllClasses.json";
import { Dispatch, SetStateAction } from "react";

type classSelectProps = {
    currentCharacter: CharacterInfo,
    updateCharacter: Dispatch<SetStateAction<CharacterInfo>>
}

function ClassSelectBuilder({currentCharacter, updateCharacter}: classSelectProps){
    const classList = class_list_json;
    classList.list.map((json: any)=> {
        json.desc = json.flavor_text,
        json.title = json.name
    })
    console.log(classList.list);
    const description = "A characters class represents their unique set of skills that help them survive and thrive on grand adventures."
    return(
        <SelectFromCards options={classList.list} popoutInner={ClassRule} optionsDescription={description}/>
    )
}

export default ClassSelectBuilder;

