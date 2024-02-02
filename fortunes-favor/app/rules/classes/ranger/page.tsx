import ClassRule from "@/app/components/Class";
import ranger_json from "@/public/rules_json/classes/Ranger.json"

function Ranger () {
    console.log(ranger_json)
    return(
        <>
            <ClassRule json={ranger_json}/>
        </>
    )
}

export default Ranger;