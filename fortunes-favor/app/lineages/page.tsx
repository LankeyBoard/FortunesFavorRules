import lineages_data from "../../public/rules_json/lineages/lineages.json";
import Lineage from "../components/Lineage";
function LineagePage(){
    console.log(lineages_data.list)
    return (
    <div className="LineagePage">
        {lineages_data.list.map((lineage_data) => {
            return(<Lineage json={lineage_data}/>)
        })}     
    </div>
    );
}

export default LineagePage;