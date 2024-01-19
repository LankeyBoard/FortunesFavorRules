import { field_options, complexity_options, stat_options, findEnum } from "../enums"

class ClassType {
    name: string;
    slug: string;
    flavor_text: string;
    complexity: complexity_options;
    health: number;
    lvlHealth: number;
    staminaStat: stat_options;
    stamina: number;
    lvlStamina: number;
    training: {
        armor?: [string],
        shield?: [string],
        weapon?: {
            melee?: [string],
            ranged?: [string],
            special?: [string]
        }
        magic?: [string]
    };
    attkStat: stat_options;
    range: {
        min: number,
        max: number
    };
    dmg: {
        dice: number,
        count: number,
        stat: stat_options
    };
    features: Feature[]
    constructor(json: any){
        this.name = json.name;
        this.slug = json.slug;
        this.flavor_text = json.flavor_text;
        const c = findEnum(json.complexity, complexity_options);
        this.complexity = complexity_options.error;
        if(c){
            this.complexity = c;
        }
        else{
            console.log("Error matching complexity %s in json file", json.complexity);
        }
        this.health = json.health;
        this.lvlHealth = json.health_on_level;
        const ss = findEnum(json.stamina_stat, stat_options);
        this.staminaStat = stat_options.error;
        if(ss){
            this.staminaStat = ss;
        }
        else{
            console.log("Error matching stamina stat %s in json file", json.stamina_stat);
        }
        this.stamina = json.stamina;
        this.lvlStamina = json.stamina_on_level;
        this.training = {
            armor: json.training.armor,
            shield: json.training.shields,
            weapon: {
                melee: json.training.weapons.melee,
                ranged: json.training.weapons.ranged,
                special: json.training.weapons.special
            },
            magic: json.training.magic
        }
        const as = findEnum(json.attack_stat, stat_options);
        this.attkStat = stat_options.error;
        if(as){
            this.attkStat = as;
        }
        else{
            console.log("Error matching attack stat %s in json file", json.attack_stat);
        }
        this.range = {
            min: json.range.min,
            max: json.range.max
        }
        const ds = findEnum(json.damage.stat, stat_options);
        let dmgStat: stat_options = stat_options.error;
        if(ds){
            dmgStat = ds;
        }
        else{
            console.log("Error matching attack dmg stat %s in json file", json.damage.stat);
        }
        this.dmg = {
            dice: json.damage.dice,
            count: json.damage.count,
            stat: dmgStat
        }
    this.features = json.features.map((json_feature: any) => new Feature(json_feature));
    }
}

class Feature {
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

class Field {
    type: field_options;
    text: string;
    constructor(json_field: any){
        this.type = field_options.error;
        const t = findEnum(json_field.type, field_options);
        if(t !== undefined){
            this.type = t;
        }
        else{
            console.log("Error matching feature type %s in json file", json_field.type);
        }
        this.text = json_field.text;
    }
}

class Choice {
    name: string;
    text: string;
    constructor(json_choice: any){
        this.name = json_choice.name;
        this.text = json_choice.text;
    }
}

type fieldProps = {
    field: Field;
}
const FieldDisplay = ({field}: fieldProps) => {
    const cn = "field"+field.type;
    return(
        <div className={cn}>
            {field.text}
        </div>
    )
}
type featureProps = {
    feature: Feature;
}
const FeatureDisplay = ({feature}: featureProps) => {

    return(
        <div className={feature.slug}>
            <div>{feature.name}</div>
            <div>level {feature.level}</div>
            <div>{feature.stamina && feature.stamina+" Stamina"}</div>
            <div>{feature.ff && "Fortune's Favor"}</div>
            <div>
                {feature.fields.map(f => <FieldDisplay field={f}/>)}
            </div>
            {feature.choices && feature.choices.map(c => <ChoiceDisplay choice={c}/>)}
        </div>
    )
}

type choiceProps = {
    choice: Choice;
}
const ChoiceDisplay = ({choice}: choiceProps) => {
    return(
        <div>
            <p><b>{choice.name}</b> - {choice.text}</p>
        </div>
    )
}

type classProps = {
    class_json: any
}
const ClassRule = ({class_json}: classProps) => {
    const class_rules: ClassType = new ClassType(class_json)
    const armorString = class_rules.training.armor?.toString() || "None";
    const shieldString = class_rules.training.shield?.toString() || "None";
    const meleeString = class_rules.training.weapon?.melee?.toString() || "None";
    const rangedString = class_rules.training.weapon?.ranged?.toString() || "None";
    const specialString = class_rules.training.weapon?.special?.toString() || "None";
    const magicString = class_rules.training.magic?.toString() || "None";
    const rangeString = (class_rules.range.min===0)? "Melee - "+class_rules.range.max+"ft" : class_rules.range.min+"ft - "+class_rules.range.max+"ft";
    const dmgString = class_rules.dmg.count+"d"+class_rules.dmg.dice+" + "+class_rules.dmg.stat;
    return(
        <>
            <div id={class_rules.slug}>
                {class_rules.name}
            </div>
            Difficulty: {class_rules.complexity}
            <div>
                <p>{class_rules.flavor_text}</p>
            </div>
            <div>
                <div>
                    <p>Health: {class_rules.health} (+{class_rules.lvlHealth} on level up)</p>
                    <p>Stamina: {class_rules.stamina}+{class_rules.staminaStat} (+{class_rules.lvlStamina}+{class_rules.staminaStat} on level up)</p>
                </div>
                <div id="classTraining">
                    <ul>
                        <li>Armor: {armorString}</li>
                        <li>Shield: {shieldString}</li>
                        <li>Weapons: [Melee: {meleeString} Ranged: {rangedString} Special: {specialString}]</li>
                        <li>Magic: {magicString}</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>Attack Stat: {class_rules.attkStat}</li>
                        <li>Range: {rangeString}</li>
                        <li>Damage: {dmgString}</li>
                    </ul>
                </div>
            </div>
            <div id="features">
                {
                    class_rules.features.map((f) => <FeatureDisplay feature={f}/>)
                }
            </div>
        </>
    )

}

export default ClassRule;