import { field_options, findEnum } from "../enums";

export class Field {
  type: field_options;
  text: string;
  constructor(json_field: any) {
    this.type = field_options.error;
    const t = findEnum(json_field.type, field_options);
    if (t !== undefined) {
      this.type = t;
    } else {
      console.log(
        "Error matching feature type %s in json file",
        json_field.type
      );
    }
    this.text = json_field.text;
  }
}

export class Choice {
  name: string;
  text: string;
  constructor(json_choice: any) {
    this.name = json_choice.name;
    this.text = json_choice.text;
  }
}
