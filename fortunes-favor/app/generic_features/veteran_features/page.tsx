import veteran_features_data from "../../../public/rules_json/generic_features/veteran_features.json";
import GenericFeatures from "../../components/GenericFeatures";
function VeteranFeaturesPage(){
    return (
    <div className="">
        <div id="veteran_features">
            <div className="text-3xl tracking-wide font-bold py-4 px-1">
                Veteran Features
            </div>
            <GenericFeatures features_json={veteran_features_data.veteranFeatures}/>
        </div>
    </div>
    );
}

export default VeteranFeaturesPage;