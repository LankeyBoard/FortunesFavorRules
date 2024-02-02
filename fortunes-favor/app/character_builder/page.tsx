"use client"
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import BasicInfoBuilder from "./basic_info/builder"
import LineageSelectBuilder from './lineage/builder';
import CultureSelectBuilder from './culture/builder';
import ClassSelectBuilder from './class/builder';
import QuestionsBuilder from './questions/builder';
import CharacterInfo from '../utils/CharacterInfo';

const tabs =[
    {
        name: "Basic Info",
        href: "/character_builder/basic_info",
        isComplete: false,
        isEnabled: true
    },
    {
        name: "Lineage",
        href: "/character_builder/lineage",
        isComplete: false,
        isEnabled: true
    },
    {
        name: "Culture",
        href: "/character_builder/culture",
        isComplete: false,
        isEnabled: true
    },
    {
        name: "Class",
        href: "/character_builder/class",
        isComplete: false,
        isEnabled: true
    },
    {
        name: "Questions",
        href: "/character_builder/questions",
        isComplete: false,
        isEnabled: false
    }
]

type tabProps = {
    name: string;
    setCurrentTab: Dispatch<SetStateAction<string>>;
    isComplete?: boolean;
    isCurrent: boolean;
    isEnabled?: boolean;
}

const COMPLETE_CURRENT = "emerald-600";
const CURRENT = "amber-800";
const COMPLETE = "emerald-800";
const ENABLED = "violet-900";
const DISABLED = "slate-800";

const Tab = ({name, setCurrentTab, isCurrent, isComplete = false, isEnabled = true}: tabProps) => {
    console.log("Tab props", name, isCurrent, isComplete, isEnabled)
    let style = "basis-1/5 py-3 mx-2 rounded-t-lg text-center "
    if(isCurrent && isComplete)
    style += "bg-"+COMPLETE_CURRENT+" cursor-default"
    else if(isCurrent)
        style += "bg-"+CURRENT+" cursor-default"
    else if(isComplete)
        style += "bg-"+COMPLETE+" cursor-pointer"
    else if(isEnabled)
        style += "bg-"+ENABLED+" hover:bg-violet-800 hover:tracking-wider cursor-pointer"
    else
        style += "bg-"+DISABLED+" cursor-default"
    console.log(style);
    if(isEnabled && !isCurrent){
        return(
            <div className={style} onClick={()=>setCurrentTab(name)} key={name+"builder-tab"}>
                {name}
            </div>
        )
    }
    else{
        return(
            <div className={style} key={name}>
                {name}
            </div>
        )
    }

}

function CharacterInner(title: string, createdCharacter: CharacterInfo, setCreatedCharacter: Dispatch<SetStateAction<CharacterInfo>>){
    switch(title){
        case "Basic Info":
            return <BasicInfoBuilder currentCharacter = {createdCharacter} updateCharacter = {setCreatedCharacter}/>
        case "Lineage":
            return <LineageSelectBuilder currentCharacter = {createdCharacter} updateCharacter = {setCreatedCharacter}/>
        case "Culture":
            return <CultureSelectBuilder currentCharacter = {createdCharacter} updateCharacter = {setCreatedCharacter}/>
        case "Class":
            return <ClassSelectBuilder currentCharacter = {createdCharacter} updateCharacter = {setCreatedCharacter}/>
        case "Questions":
            return <QuestionsBuilder currentCharacter = {createdCharacter} updateCharacter = {setCreatedCharacter}/>
    }
}

function CharacterBuilder() {
    const [currentTab, setCurrentTab] = useState(tabs[0].name);
    const [createdCharacter, setCreatedCharacter] = useState(new CharacterInfo());

    const isTabCompleted =(tabName: string) => {
        switch(tabName){
            case "Culture":
                console.log("Comparing cultures", createdCharacter.characterCulture);
                return createdCharacter.characterCulture != undefined;
            case "Lineage":
                console.log("Comparing lineage", createdCharacter.characterLineage);
                return createdCharacter.characterLineage != undefined;
            case "Class":
                console.log("Comparing lineage", createdCharacter.characterClass);
                return createdCharacter.characterClass != undefined;
        }
    }
    
    return(
        <div>
            <div className={"flex flex-row mt-4"}>
                {tabs.map((tab) => {return(<Tab name={tab.name} setCurrentTab={setCurrentTab} isCurrent={currentTab === tab.name} isComplete={isTabCompleted(tab.name)} isEnabled={tab.isEnabled}/>)})}
            </div>
            <div>
                {CharacterInner(currentTab, createdCharacter, setCreatedCharacter)}
            </div>
        </div>
        
    )
}

export default CharacterBuilder;