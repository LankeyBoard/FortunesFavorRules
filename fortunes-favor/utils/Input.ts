import { RuleText } from "./graphQLtypes";

class Input {
  readonly title: string;
  readonly text: [RuleText];

  constructor(title: string, text: [RuleText]) {
    this.title = title;
    this.text = text;
  }
}

export default Input;
