import { TextField } from "./FieldTypes";

export class CharacterTrait {
  title: string;
  text: [TextField];
  constructor(json: any) {
    this.title = json.title;
    this.text = json.text;
  }
}
