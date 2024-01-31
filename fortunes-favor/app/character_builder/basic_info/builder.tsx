import InputArea from "@/app/components/blocks/InputArea";
import InputField from "@/app/components/blocks/InputField";

function BasicInfoBuilder(){
    return (
    <div className="p-10">
        Basic Info about the character
        <div className="max-w-lg mx-auto">
            <div className="flex flex-row gap-4 ">
                <div className="basis-1/4">
                    <InputField name="Level" type="number" defaultValue="1"/>
                </div>
                <div className="basis-3/4">
                    <InputField name="Name" type="text"/>
                </div>
            </div>
            <div className="mt-8">
                <InputArea name="Character Question 1"/>
            </div>
        </div>
    </div>
    );
}

export default BasicInfoBuilder;