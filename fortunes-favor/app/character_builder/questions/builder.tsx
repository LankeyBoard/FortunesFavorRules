import CharacterInfo from "@/app/utils/CharacterInfo";
import { Dispatch, SetStateAction } from "react";

type questionProps = {
    currentCharacter: CharacterInfo,
    updateCharacter: Dispatch<SetStateAction<CharacterInfo>>
}

function QuestionsBuilder({currentCharacter, updateCharacter}: questionProps){
    return (
    <div className="">
        Answer a few questions based on your class, lineage, culture and anything the GM wants to ask.
    </div>
    );
}

export default QuestionsBuilder;