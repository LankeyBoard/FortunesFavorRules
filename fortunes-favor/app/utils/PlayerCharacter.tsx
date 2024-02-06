import { LANGUAGES, stat_options } from "../enums";
import CharacterClass from "./CharacterClass";
import CharacterCulture from "./CharacterCulture";
import CharacterLineage from "./CharacterLineage";

type Stats = {
    mettle: number,
    agility: number,
    heart: number,
    intellect: number
}

type Effect = {
    target: string;
    type: EffectTypes;
    calculation: (args: any) => string | number;
}

enum EffectTypes{
    add = "ADD",
    replace = "REPLACE"
}

enum Rarity {
    common = "Common",
    uncommon = "Uncommon",
    rare = "Rare",
    ultraRare = "Ultra Rare",
    legendary = "Legendary",
    unique = "Unique"
}

class Input{
    readonly title: string;
    readonly text: string;

    constructor(title: string, text: string) {
        this.title = title;
        this.text = text;
    }
}

class Feature extends Input {
    readonly effects?: [Effect];

    constructor(title: string, text: string, effects: [Effect]){
        super(title, text);
        this.effects = effects;
    }
}

class CharacterFeature extends Feature {
    readonly source: Object;

    constructor(title: string, text: string, source: Object, effects: [Effect]){
        super(title, text, effects);
        this.source = source;
    }
}

class Item  extends Feature{
    readonly isMagicItem: boolean;
    readonly rarity: Rarity;
    constructor(title: string, text: string, effects: [Effect], isMagicItem: boolean, rarity: Rarity){
        super(title, text, effects);
        this.isMagicItem = isMagicItem;
        this.rarity = rarity;
    }
}

export default class PlayerCharacter {
    name?: string;
    private _level?: number;
    private _characterClass?: CharacterClass;
    private _characterCulture?: CharacterCulture;
    private _stats?: Stats;
    private _characterLineage?: CharacterLineage;
    private _speeds?: [{type: string, speed: number}]
    coin?: number;
    private _currentHealth?: number;
    private _maxHealth?: number;
    private _maxStamina?: number;
    private _currentStamina?: number;
    private _armor?: number;
    private _counter?: number | undefined;
    private _baseDamage?: number;
    private _range?: {min: number, max:number};
    private  _items?: [Item]
    private _actions?: [CharacterFeature];
    private _counters?: [CharacterFeature];
    private _features?: [CharacterFeature];
    private _languages?: [LANGUAGES];

    constructor(){
        this._level = 1;
        this.coin = 10;
        this._languages = [LANGUAGES.allspeak];
    }

    public get level(): number | undefined{
        return this._level;
    }
    public set level(level: number){
        this._level = level;
        // TODO: Hanle level up
    }
    public get class(): CharacterClass | undefined{
        return this._characterClass;
    }
    public set class(characterClass: CharacterClass){
        this._characterClass = characterClass;
        // TODO: update the rest of the characters info based on the current class.
    }
    public get culture(): CharacterCulture | undefined{
        return this._characterCulture;
    }
    public set culture(characterCulture: CharacterCulture){
        this._characterCulture = characterCulture;
        // TODO: update the rest of the characters info based on the current class.
    }
    public get lineage(): CharacterLineage | undefined{
        return this._characterLineage;
    }
    public set lineage(characterLineage: CharacterLineage){
        this._characterLineage = characterLineage;
        // TODO: update the rest of the characters info based on the current class.
    }
    public get stats(): Stats | undefined{
        return this._stats;
    }
    public set stats(stats: Stats){
        this._stats = stats;
        // TODO: Handle stats updating
    }
    public get currentStamina(): number | undefined{
        return this._currentStamina;
    }
    public set currentStamina(stamina: number){
        this._currentStamina = stamina;
    }
    public get currentHealth(): number | undefined{
        return this._currentHealth;
    }
    public set currentHealth(health: number){
        this._currentHealth = health;
    }

    // Dirived Values

    public get speeds(){
        return this._speeds;
    }
    public get maxHealth(){
        return this._maxHealth;
        // if(this._characterClass && this._level)
        //     return (this._characterClass?.health + (this._level-1)*this._characterClass?.lvlHealth);
        // else
        //     return 0;
    }
    public get maxStamina(){
        return this._maxStamina;
        // let staminaStat = 0;
        // if(this._stats && this._characterClass && this._level){
        //     switch(this._characterClass?.staminaStat){
        //         case stat_options.mettle:
        //             staminaStat = this._stats.mettle;
        //             break;
        //         case stat_options.agility:
        //             staminaStat = this._stats.agility;
        //             break;
        //         case stat_options.heart:
        //             staminaStat = this._stats.heart;
        //             break;
        //         case stat_options.int:
        //             staminaStat = this._stats.intellect;
        //             break;
        //     }
        //     return this._characterClass?.stamina + (this._level-1)*this._characterClass?.lvlStamina + this._level*staminaStat
        // }
    }
    public get armor(){
        return this._armor;
    }
    public get counter(): number | undefined {
        return this._counter;
    }
    public get baseDamage(){
        return this._baseDamage;
    }
    public get range(){
        return this._range;
    }
    public get items() {
        return this._items;
    }
    public get actions(){
        return this._actions;
    }
    public get counters(){
        return this._counters;
    }
    public get features (){
        return this._features;
    }
    public get languages (){
        return this._languages;
    }
}
