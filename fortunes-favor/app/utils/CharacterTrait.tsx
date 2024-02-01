export class CharacterTrait {
    title: string;
    text: string;
    constructor(json: any){
        this.title = json.title;
        this.text = json.text;
    }
}