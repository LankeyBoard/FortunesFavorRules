import PlayerCharacter from "@/utils/PlayerCharacter";
import { Dispatch, SetStateAction } from "react";

type questionProps = {
    currentCharacter: PlayerCharacter,
    updateCharacter: Dispatch<SetStateAction<PlayerCharacter>>
}

function QuestionsBuilder({currentCharacter, updateCharacter}: questionProps){
    return (
    <div className="">
        Answer a few questions based on your class, lineage, culture and anything the GM wants to ask.
    </div>
    );
}

export default QuestionsBuilder;