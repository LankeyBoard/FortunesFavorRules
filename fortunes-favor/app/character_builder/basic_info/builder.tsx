import InputField from "@/app/components/blocks/InputField";

function BasicInfoBuilder(){
    return (
    <div className="p-10">
        Basic Info about the character
        <InputField name="Character Level" type="number" defaultValue="1"/>
    </div>
    );
}

export default BasicInfoBuilder;