import { rule_type, findEnum } from "../enums";

export class TextField {
  type: rule_type;
  text: string;
  constructor(json_field: any) {
    this.type = rule_type.error;
    const t = findEnum(json_field.type, rule_type);
    if (t !== undefined) {
      this.type = t;
    } else {
      console.error(
        "Error matching feature type %s in json file",
        json_field.type
      );
    }
    this.text = json_field.text;
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
