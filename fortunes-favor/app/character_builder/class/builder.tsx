import ClassRule from "@/app/components/Class";
import SelectFromCards from "@/app/components/SelectFromCards";
import brawler_json from "@/public/rules_json/classes/Brawler.json";
import devoted_json from "@/public/rules_json/classes/Devoted.json";
import elementalist_json from "@/public/rules_json/classes/Elementalist.json";
import knight_json from "@/public/rules_json/classes/Knight.json";
import ranger_json from "@/public/rules_json/classes/Ranger.json";

function ClassSelectBuilder(){
    const classList = {
        list: [brawler_json, devoted_json, elementalist_json, knight_json, ranger_json]
    }
    classList.list.map((json: any)=> {
        json.desc = json.flavor_text,
        json.title = json.name
    })
    console.log(classList.list)
    return(
        <SelectFromCards options={classList.list} popoutInner={ClassRule}/>
    )
}

export default ClassSelectBuilder;

