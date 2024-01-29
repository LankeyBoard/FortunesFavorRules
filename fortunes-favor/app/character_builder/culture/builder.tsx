import Culture from "@/app/components/Culture";
import SelectFromCards from "@/app/components/SelectFromCards";
import cultures_json from "@/public/rules_json/cultures/cultures.json"

function CultureSelectBuilder(){
    console.log(cultures_json.list)
    return(
        <SelectFromCards options={cultures_json.list} popoutInner={Culture}/>
    )
}

export default CultureSelectBuilder;