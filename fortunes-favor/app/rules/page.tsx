import SlugLinker from "../components/blocks/SlugLinker";
import RuleText from "../utils/Rules";

const rules: RuleText[] = [
  new RuleText("Title", "Slug", "Description of the rule"),
];

const fs = require("fs");
const path = require("path");

const jsonDir = "./public/rules_json/core_rules";

const jsonsInDir = fs
  .readdirSync(jsonDir)
  .filter((file: any) => path.extname(file) === ".json");
console.log("Loading json files");
jsonsInDir.forEach((file: any) => {
  const fileData = fs.readFileSync(path.join(jsonDir, file));
  const json = JSON.parse(fileData.toString());
  console.log(json);
});

const exampleLink =
  "Example text before the link [Example Link](/rules/player_rules/getting_started/character_resources) and after the link [block] and (emphasis)";

export default function RulesHome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <SlugLinker text={exampleLink} />
      </div>
    </main>
  );
}
