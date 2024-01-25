import ClassRule from "@/app/components/Class";
import devoted_json from "../../../public/rules_json/classes/Devoted.json"

function Devoted () {
    console.log(devoted_json)
    return(
        <>
            <ClassRule class_json={devoted_json}/>
        </>
    )
}

export default Devoted;