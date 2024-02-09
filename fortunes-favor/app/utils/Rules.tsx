export default class RuleText {
  readonly title: string;
  readonly slug?: string;
  description?: string;

  constructor(title: string, slug?: string, description?: string) {
    this.title = title;
    this.slug = slug;
    this.description = description;
  }
}
