import RuleField from "../../components/RuleField";
import { rule_type } from "../../utils/enums";
import { GenericRule } from "../../utils/graphQLtypes";

const rulesPageText: GenericRule[] = [
  {
    title: "The Basics",
    slug: "TLDR",
    ruleType: rule_type.Rule,
    text: [
      {
        text: "Fortune's Favor is a d20 based system with success, mixed results and failures. At its simplest, a player wants to do something risky, the Game Master (GM) decides how difficult the task is and tells the player. They both work together to figure out what bonuses apply to the roll. The player rolls and based on the result the GM continues to narrate the scene.",
        type: "RULE",
      },
    ],
    subRules: [],
    list: [],
  },
  {
    title: "What to Read",
    slug: "WHAT-TO-READ",
    ruleType: rule_type.Rule,
    text: [
      {
        text: "You aren't expected or required to read the rules cover to cover before you play. Here are a few different suggested reading lists.",
        type: "RULE",
      },
    ],
    subRules: [
      {
        title: "Jump Right In",
        slug: "JUMP-RIGHT-IN",
        ruleType: rule_type.Rule,
        text: [
          {
            text: "Read [Building a Character](/rules/player_rules#BUILDING-A-PC), [Parts of a Character](/rules/player_rules#WHAT-MAKES-UP-A-CHARACTER) & [Character Resources](/rules/player_rules#CHAR-RESOURCES). Then skim the [Cultures](/rules/cultures), [Lineages](/rules/lineages) and [Classes](/rules/classes) and read the ones that interest you.",
            type: "RULE",
          },
        ],
        subRules: [],
        list: [],
      },
      {
        title: "A Solid Understanding",
        slug: "SOLID-UNDERSTANDING",
        ruleType: rule_type.Rule,
        text: [
          {
            text: "Read from [Building a Character](/rules/player_rules#BUILDING-A-PC) until the end of [Combat](/rules/player_rules#COMBAT). Then skim the [Cultures](/rules/cultures), [Lineages](/rules/lineages) and [Classes](/rules/classes) and read the ones that interest you. Then read the [Dying & Last Stand](/rules/player_rules#EDL) & [Healing](/rules/player_rules#NON-MAGICAL-HEALING) sections.",
            type: "RULE",
          },
        ],
        subRules: [],
        list: [],
      },
      {
        title: "Running a Game",
        slug: "RUNNING",
        ruleType: rule_type.Rule,
        text: [
          {
            text: "You have to read all the rules.",
            type: "RULE",
          },
        ],
        subRules: [],
        list: [],
      },
    ],
    list: [],
  },
];

export default function RulesHome() {
  return (
    <main className="">
      <div className="" id="">
        {rulesPageText.map((rule) => {
          return <RuleField field={rule} depth={1} key={rule.slug} />;
        })}
      </div>
    </main>
  );
}
