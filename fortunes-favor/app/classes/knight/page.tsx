import ClassRule from "@/app/components/Class";
import knight_json from "../../../public/rules_json/classes/Knight.json"

function Knight () {
    console.log(knight_json)
    return(
        <>
            <ClassRule json={knight_json}/>
        </>
    )
}

export default Knight;