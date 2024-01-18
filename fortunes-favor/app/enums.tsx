export enum field_options {
    Rule = "RULE",
    Flavor = "FLAVOR",
    Eg = "EG",
    List = "LIST",
    Choice = "CHOICE",
    Attack = "ATTACK",
    error = "ERROR"
}

export enum complexity_options {
    std = "standard",
    simple = "simple",
    complex = "complex",
    error = "ERROR"
}

export enum stat_options {
    mettle = "Mettle",
    agility = "Agility",
    heart = "Heart",
    int = "Intellect",
    error = "ERROR"
}

export function findEnum(s: String, e: any): any|undefined{
    let keys: string[] = Object.keys(e);
    let match = undefined;
    keys.forEach((key) => {
        if(s === e[key]){
            console.log("match");
            match = e[key];
        }
    })
    return match;
}