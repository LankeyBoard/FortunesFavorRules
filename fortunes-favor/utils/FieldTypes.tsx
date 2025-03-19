import { RuleType, findEnum } from "./enums";

export class TextField {
  type: RuleType;
  text: string;
  choices: string[];
  constructor(json_field: any) {
    this.type = RuleType.ERROR;
    const t = findEnum(json_field.type, RuleType);
    if (t !== undefined) {
      this.type = t;
    } else {
      console.error(
        "Error matching feature [%s] type %s in json file",
        json_field,
        json_field.type,
      );
    }
    this.text = json_field.text;
    this.choices = json_field.choices;
  }
}

export class Choice {
  title: string;
  text: string;
  constructor(json_choice: any) {
    this.title = json_choice.title;
    this.text = json_choice.text;
  }
}
