import ClassRule from "@/app/components/Class";
import elementalist_json from "../../../public/rules_json/classes/Elementalist.json"

function Elementalist () {
    console.log(elementalist_json)
    return(
        <>
            <ClassRule class_json={elementalist_json}/>
        </>
    )
}

export default Elementalist;