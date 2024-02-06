import {Field, Choice} from "@/app/utils/FieldTypes"
import { field_options, findEnum } from "../enums";

export default class Feature {
    level: number;
    name: string;
    slug: string;
    stamina?: number;
    ff?: number;
    type: field_options;
    fields: Field[];
    choices?: Choice[];
    constructor(json_feature: any){
        this.level = json_feature.level;
        this.name = json_feature.name;
        this.slug = json_feature.slug;
        this.stamina = json_feature.stamina_cost;
        this.ff = json_feature.fortunes_favor;
        this.type = field_options.error;
        const t = findEnum(json_feature.type, field_options);
        if(t){
            this.type = t;
        }
        else{
            console.log("Error matching feature type %s in json file", json_feature.type);
        }
        this.fields = json_feature.fields.map((json_field: any) => new Field(json_field));
        if(this.type === field_options.Choice){
            this.choices = json_feature.choices.map((json_choice: any) => new Choice(json_choice));
        }
    }
}