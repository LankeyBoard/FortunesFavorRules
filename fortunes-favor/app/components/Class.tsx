import { field_options, complexity_options, stat_options, findEnum } from "../enums"
import { getOrdinal } from "../utils/utils";
import { ReactElement } from "react";
import Feature from "../utils/Feature";
import {Field, Choice} from "@/app/utils/FieldTypes"
import CharacterClass from "../utils/CharacterClass";

type fieldProps = {
    field: Field;
}
const FieldDisplay = ({field}: fieldProps) => {
    const cn = "field"+field.type;
    const displayVariants = {
        reg: '',
        flavor: 'italic'
    }
    return(
        <div className={field.type === field_options.Flavor ? displayVariants.flavor : displayVariants.reg}>
            {field.text}
        </div>
    )
}
type featureProps = {
    feature: Feature;
}
const FeatureDisplay = ({feature}: featureProps) => {

    return(
        <div id={feature.slug} className="bg-slate-800 my-5">
            <div className="bg-teal-700 text-lg p-2 font-semibold">
                {feature.name}
                <div className="text-slate-200 text-sm ordinal float-right">{feature.level+getOrdinal(feature.level)} level</div>
            </div>
            <div className="px-4 py-2">
                {feature.stamina &&<div><span className="font-semibold">Costs - </span> {feature.stamina} Stamina</div>}
                {feature.ff && <div className="font-semibold">Fortune's Favor</div>}
                <div>
                    {feature.fields.map(f => <FieldDisplay field={f}/>)}
                </div>
                {feature.choices && feature.choices.map(c => <ChoiceDisplay choice={c}/>)}
            </div>
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

const makeTrainingString = (training_list: [string] | undefined) => {
    console.log("training list = " + training_list)
    if(!training_list || training_list.length < 1 || training_list[0] == null)
        return "None"
    if(parseInt(training_list[0])){
        return ("Choose " + training_list[0] + " of the following options " + "[ "+ training_list.slice(1).join(', ') + " ]");
    }
    return("[ " + training_list.join(', ') + " ]");
}

type tagProps = {
    text: string,
    style?: string,
}

const Tag =({text, style}: tagProps) => {
    const s = style? style : "bg-teal-900";
    const tagStyle = s + " capitalize float-left rounded-lg py-2 px-4 mr-3 my-4 text-sm";
    return(
        <div className={tagStyle}>
            {text}
        </div>
    )
}
type classTagsProps = {
    c: CharacterClass;
}

const ClassTags = ({c}: classTagsProps) => {
    let tags: ReactElement[]= new Array;
    let tagStyle;
    switch(c.complexity){
        case complexity_options.simple:
            tagStyle = "bg-green-800";
            break;
        case complexity_options.std:
            tagStyle = "bg-amber-800";
            break;
        case complexity_options.complex:
            tagStyle = "bg-blue-800";
            break;
        default:
            tagStyle = "bg-rose-500";
    }
    tags.push(<Tag style={tagStyle} text={c.complexity}/>);
    tags.push(<Tag text={c.attkStat}/>);
    if(c.attkStat !== c.dmg.stat){
        tags.push(<Tag text={c.dmg.stat}/>);
    }
    if(c.attkStat !== c.dmg.stat && c.dmg.stat !== c.staminaStat && c.attkStat !== c.staminaStat){
        tags.push(<Tag text={c.staminaStat}/>);
    }
    return(
        <div>
            {tags}
        </div>
    )
}

type classProps = {
    json: any
}
const ClassRule = ({json}: classProps) => {
    console.log("ClassRules input", json)
    const class_rules: CharacterClass = new CharacterClass(json)
    const armorString = makeTrainingString(class_rules.training.armor);
    const shieldString = makeTrainingString(class_rules.training.shield);
    const meleeString = makeTrainingString(class_rules.training.weapon?.melee);
    const rangedString = makeTrainingString(class_rules.training.weapon?.ranged);
    const specialString = makeTrainingString(class_rules.training.weapon?.special);
    const magicString = makeTrainingString(class_rules.training.magic);
    const rangeString = (class_rules.range.min===0)? "Melee - "+class_rules.range.max+"ft" : class_rules.range.min+"ft - "+class_rules.range.max+"ft";
    const dmgString = class_rules.dmg.count+"d"+class_rules.dmg.dice+" + "+class_rules.dmg.stat;
    return(
        <div id={class_rules.slug}>
            <div className="w-full">
                <div className="text-3xl tracking-wide font-bold py-4 px-1">
                    {class_rules.name}
                </div>
            </div>
            <ClassTags c={class_rules}/>
            <div className="clear-both">
                <div className="mx-3">
                    <p className="italic">{class_rules.flavor_text}</p>
                </div>
                <div className="mt-2">
                    <div className="mx-3">
                        <p><span className="font-semibold">Health</span><span className=""> - {class_rules.health} (+{class_rules.lvlHealth} on level up)</span></p>
                        <p><span className="font-semibold clear-left">Stamina</span><span> - {class_rules.stamina}+{class_rules.staminaStat} (+{class_rules.lvlStamina}+{class_rules.staminaStat} on level up)</span></p>
                    </div>
                    <div id="classTraining" className="mt-2 p-3 border-amber-800 border-y-2">
                        <p className="font-semibold text-lg">Training</p>
                        <ul className="px-4">
                            <li><span className="font-normal">Armor - </span><span className="font-light">{armorString}</span></li>
                            <li><span className="font-normal">Shield - </span><span className="font-light">{shieldString}</span></li>
                            <li><p className="font-normal">Weapons </p>
                                <div className="font-extralight px-4">
                                    <p><span className="font-normal">Melee: - </span>{meleeString}</p>
                                    <p><span className="font-normal">Ranged - </span>{rangedString}</p>
                                    <p><span className="font-normal">Special - </span>{specialString}</p>
                                </div>
                            </li>
                            <li><span className="font-normal">Magic: </span><span className="font-light">{magicString}</span></li>
                        </ul>
                    </div>
                    <div className="mx-3 mt-2">
                        <p><span className="font-semibold">Attack Stat</span><span className=""> - {class_rules.attkStat}</span></p>
                        <p><span className="font-semibold clear-left">Range</span><span> - {rangeString}</span></p>
                        <p><span className="font-semibold clear-left">Damage</span><span> - {dmgString}</span></p>
                    </div>
                </div>
            </div>
            <div id="features">
                <div className="my-4 mx-2 text-2xl tracking-wide">Features</div>
                <div className="px-10">
                {
                    class_rules.features.map((f) => <FeatureDisplay feature={f}/>)
                }
                </div>
            </div>
        </div>
    )

}

export default ClassRule;