export enum field_options {
    Rule = "RULE",
    Flavor = "FLAVOR",
    Eg = "EG",
    List = "LIST",
    CompactList = "LIST-COMPACT",
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

export enum size_options {
    Miniscule = "MINISCULE",
    Tiny = "TINY",
    Small = "SMALL",
    Medium = "MEDIUM",
    Large = "LARGE",
    Gigantic = "GIGANTIC",
    Titanic = "TITANIC",
    Colossal = "COLOSSAL",
    error = "ERROR"
}

export function findEnum(s: String, e: any): any|undefined{
    let keys: string[] = Object.keys(e);
    let match = undefined;
    keys.forEach((key) => {
        if(s === e[key]){
            match = e[key];
        }
    })
    return match;
}