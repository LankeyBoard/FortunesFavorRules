import { useState, useEffect } from "react";
import Card from "./blocks/Card";
import OptionPopout from "./blocks/OptionPopout";

type option = {
    [key: string]: unknown
    
}

type selectFromCardsProps ={
    options: option[],
    popoutInner: (json: any) => JSX.Element,
    optionsDescription: string
}

const SelectFromCards = ({options, popoutInner, optionsDescription}: selectFromCardsProps) => {
    const [showPopout, setShowPoput] = useState(false);
    const [selectedSlug, setSelectedSlug] = useState<string | undefined>(undefined);
    const [currentSlug, setCurentSlug] = useState<string | undefined>(undefined);
    const [currentChild, setCurrentChild] = useState<JSX.Element | undefined>(undefined);
    useEffect(()=> {
        console.log("options: ", options);
        if(currentSlug){
            const selectedJson = {
                json: options.find((o)=>o.slug === currentSlug)
            }
            if(selectedJson){
                setCurrentChild(popoutInner(selectedJson));
            }
        }
        console.log("useEffect", selectedSlug===currentSlug, options);
    },[currentSlug]);
    const pickCard=(slug: string)=>{
        setCurentSlug(slug);
        setShowPoput(true);
    }

    return (
        <div className="w-full">
            {showPopout && <OptionPopout child={currentChild} showPopout={setShowPoput} isSelected={selectedSlug===currentSlug} setSelectedSlug={setSelectedSlug}/>}
            <div>
                <div className="italic my-4 mx-4">{optionsDescription}</div>
                <div className="text-sm text-slate-300 mx-4">Click on each of the options below for more information.</div>
                <div className="flex flex-wrap w-full">
                    {options.map((c) => {
                        if(typeof c.title === "string" && typeof c.desc === "string" && typeof c.slug === "string"){
                            return(<Card title={c.title} text={c.desc} slug={c.slug} pickCard={pickCard} selectedSlug={selectedSlug} key={"card-"+c.title}/>)
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default SelectFromCards;