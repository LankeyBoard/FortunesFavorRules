import ClassRule from "@/app/components/Class";
import brawler_json from "../../../public/rules_json/classes/Brawler.json"

function Brawler () {
    console.log(brawler_json)
    return(
        <>
            <ClassRule json={brawler_json}/>
        </>
    )
}

export default Brawler;