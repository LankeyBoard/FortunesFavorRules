import { useState, useEffect, SetStateAction, Dispatch } from "react";
import Card from "./blocks/Card";
import OptionPopout from "./blocks/OptionPopout";
import PlayerCharacter from "../utils/PlayerCharacter";
import { option_type } from "../enums";

const getSelectedSlug = (optionType: option_type, currentCharacter: PlayerCharacter) => {
    switch(optionType){
        case option_type.culture:
            return currentCharacter.culture?.slug;
        case option_type.lineage:
            return currentCharacter.lineage?.slug;
        case option_type.class:
            return currentCharacter.class?.slug;
        default:
            return undefined;
    }
}

type selectFromCardsProps ={
    optionType: option_type,
    options: any[],
    popoutInner: (json: any) => JSX.Element,
    optionsDescription: string,
    currentCharacter: PlayerCharacter,
    updateCharacter: Dispatch<SetStateAction<PlayerCharacter>>
}

const SelectFromCards = ({optionType, options, popoutInner, optionsDescription, currentCharacter, updateCharacter}: selectFromCardsProps) => {
    const [showPopout, setShowPoput] = useState(false);
    const [selectedSlug, setSelectedSlug] = useState<string | undefined>(getSelectedSlug(optionType, currentCharacter));
    const [currentSlug, setCurentSlug] = useState<string | undefined>(getSelectedSlug(optionType, currentCharacter));
    const [currentChild, setCurrentChild] = useState<JSX.Element | undefined>(undefined);
    console.log("currentSlug=",currentSlug)
    useEffect(()=> {
        if(currentSlug){
            const selectedJson = {
                json: options.find((o)=>o.slug === currentSlug)
            }
            if(selectedJson){
                setCurrentChild(popoutInner(selectedJson));
            }
        }
    },[currentSlug]);
    const pickCard=(slug: string)=>{
        setCurentSlug(slug);
        setShowPoput(true);
    }

    useEffect(()=> {
        console.log("Selected slug changed", selectedSlug)
        handleSelection(selectedSlug);
    },[selectedSlug])

    const handleSelection=(slug: string | undefined)=>{
        setCurentSlug(slug);
        let updatedCharacter = structuredClone(currentCharacter);
        console.log(optionType)
        switch(optionType){
            case option_type.culture:
                let culture;
                if(slug === undefined){
                    culture = undefined;
                }
                else{
                    culture = options.find((c)=>c.slug===slug);
                }
                console.log("Updating character culture to ", culture)
                updatedCharacter.culture = culture;
                break;
            case option_type.class:
                let characterClass;
                if(slug === undefined){
                    characterClass = undefined;
                }
                else{
                    characterClass = options.find((c)=>c.slug===slug);
                }
                console.log("Updating character class to ", characterClass)
                updatedCharacter.class = characterClass;
                break;
            case option_type.lineage:
                let lineage;
                if(slug === undefined){
                    lineage = undefined;
                }
                else{
                    lineage = options.find((c)=>c.slug===slug);
                }
                console.log("Updating character lineage to ", lineage)
                updatedCharacter.lineage = lineage;
                break;
        }
        updateCharacter(updatedCharacter);
    }

    return (
        <div className="w-full">
            {showPopout && <OptionPopout child={currentChild} showPopout={setShowPoput} isSelected={selectedSlug===currentSlug} setSelectedSlug={setSelectedSlug} large={optionType === option_type.class}/>}
            <div>
                <div className="italic my-4 mx-4">{optionsDescription}</div>
                <div className="text-sm text-slate-300 mx-4">Click on each of the options below for more information.</div>
                <div className="w-fit">
                    <div className="flex flex-wrap">
                        {options.map((c) => {
                            if(typeof c.title === "string" && typeof c.desc === "string" && typeof c.slug === "string"){
                                return(<Card title={c.title} text={c.desc} slug={c.slug} pickCard={pickCard} selectedSlug={selectedSlug} key={"card-"+c.title}/>)
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectFromCards;