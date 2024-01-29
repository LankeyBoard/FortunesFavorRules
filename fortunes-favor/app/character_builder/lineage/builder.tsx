import Lineage from "@/app/components/Lineage";
import SelectFromCards from "@/app/components/SelectFromCards";
import lineages_json from "@/public/rules_json/lineages/lineages.json"

function LineageSelectBuilder(){
    return(
        <SelectFromCards options={lineages_json.list} popoutInner={Lineage}/>
    )
}

export default LineageSelectBuilder;