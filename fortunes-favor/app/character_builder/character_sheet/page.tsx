"use client"
import InputField from "@/app/components/blocks/InputField";
import PlayerCharacter from "@/app/utils/PlayerCharacter";
import { useEffect, useState } from "react";

export default function PlayerCharacterSheet () {
    const [character, setCharacter] = useState(new PlayerCharacter());
    
    return(
        <div>
            Player Character
            <div className="">
                <div className="flex flex-row">
                    <InputField name="Level" isRequired={true} type="number" defaultValue={character.level}/>
                    <InputField name="Character Name" isRequired={true} defaultValue={character.name}/>
                </div>
                <div className="flex flex-row">
                    <InputField name="Culture" isRequired={true} defaultValue={character.culture?.title}/>
                    <InputField name="Lineage" isRequired={true} defaultValue={character.lineage?.title}/>
                    <InputField name="Class" isRequired={true} defaultValue={character.class?.name}/>
                </div>
            </div>
            <div>
                Stats
                <div className="flex flex-row">
                    <InputField name="Mettle" isRequired={true} defaultValue={character.stats?.mettle}/>
                    <InputField name="Agility" isRequired={true} defaultValue={character.stats?.agility}/>
                    <InputField name="Heart" isRequired={true} defaultValue={character.stats?.heart}/>
                    <InputField name="Intellect" isRequired={true} defaultValue={character.stats?.intellect}/>
                </div>
            </div>
            <div className="flex flex-row">
                <InputField name="Max Stamina" isRequired={true} defaultValue={character.maxStamina}/>
                <InputField name="Current Stamina" isRequired={true} defaultValue={character.currentStamina}/>
            </div>
            <div className="flex flex-row">
                <InputField name="Max Health" isRequired={true} defaultValue={character.maxHealth}/>
                <InputField name="Current Health" isRequired={true} defaultValue={character.currentHealth}/>
            </div>
            <div className="flex flex-row">
                <InputField name="Armor" isRequired={true} defaultValue={character.armor}/>
                <InputField name="Counter" isRequired={true} defaultValue={character.counter}/>
                <InputField name="Base Damage" isRequired={true} defaultValue={character.baseDamage}/>
            </div>
            <div>
                <span>Speed</span>
                <div className="flex flex-row">
                    {character.speeds?.map((s) => {
                        return(<InputField name={s.type} isRequired={true} defaultValue={s.speed} key={s.type}/>);
                    })}
                </div>
                
            </div>
            <div>
                <span>Range</span>
                <div className="flex flex-row">
                    <InputField name="Min" isRequired={true} defaultValue={character.range?.min}/>
                    <InputField name="Min" isRequired={true} defaultValue={character.range?.max}/>
                </div>
            </div>
            <div>
                <span>Items</span>
                <div>
                    {character.items?.map(item => {
                        return(<span>{item.title}</span>)
                    })}
                </div>
            </div>
            <div>
                <InputField name="Coin" isRequired={true} defaultValue={character.coin}/>
            </div>
            <div>
                <span>Actions</span>
                {character.actions?.map(action => {
                    return(<div>{action.title}</div>)
                })}
            </div>
            <div>
                <span>Counters</span>
                {character.counters?.map(counter => {
                    return(<div>{counter.title}</div>)
                })}
            </div>
            <div>
                Features
                {character.features?.map(feature => {
                    return(<div>{feature.title}</div>)
                })}
            </div>
        </div>
    )
}

