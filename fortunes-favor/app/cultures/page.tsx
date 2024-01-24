import culuture_data from "../../public/rules_json/cultures/cultures.json";
import Culture from "../components/Culture";
function CulturePage(){
    console.log(culuture_data.list)
    return (
    <div className="LineagePage">
        {culuture_data.list.map((culuture_data) => {
            return(<Culture json={culuture_data}/>)
        })}     
    </div>
    );
}

export default CulturePage;