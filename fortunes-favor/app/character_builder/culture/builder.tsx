import Culture from "@/app/components/Culture";
import SelectFromCards from "@/app/components/SelectFromCards";
import cultures_json from "@/public/rules_json/cultures/cultures.json"

function CultureSelectBuilder(){
    console.log(cultures_json.list);
    const description = "A characters culture represents the society that they are most strongly tied to. Usually this is the culture they were brought up in, but if they've spent enough time in a different region it would make sense for a characters culture to match their new location.";
    return(
        <>
        <SelectFromCards options={cultures_json.list} popoutInner={Culture} optionsDescription={description}/>
        </>
    )
}

export default CultureSelectBuilder;