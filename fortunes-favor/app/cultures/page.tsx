import culuture_data from "@/public/rules_json/cultures/cultures.json";
import Culture from "../components/Culture";
function CulturePage(){
    console.log("Culture data: ",culuture_data.list)
    return (
    <div className="grid grid-cols-1 divide-y-2 divide-slate-500 mb-2">
        {culuture_data.list.map((culuture_data) => {
            return(
                <Culture json={culuture_data}/>
            )
        })}     
    </div>
    );
}

export default CulturePage;