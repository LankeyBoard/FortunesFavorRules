import novice_features_data from "../../../public/rules_json/generic_features/novice_features.json";
import GenericFeatures from "../../components/GenericFeatures";
function NoviceFeaturesPage(){
    return (
    <div className="grid grid-cols-1 divide-y-2 divide-slate-500 mb-2">
        <div id="novice_features">
            <div className="text-3xl tracking-wide font-bold py-4 px-1">
                Novice Features
            </div>
            <GenericFeatures features_json={novice_features_data.noviceFeatures}/>
        </div>
    </div>
    );
}

export default NoviceFeaturesPage;