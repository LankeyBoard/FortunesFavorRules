import SlugLinker from "../components/blocks/SlugLinker";
import RuleField from "../components/RuleField";
import { RuleType } from "../utils/enums";
import { GenericRule } from "../utils/graphQLtypes";

const rulesPageText: GenericRule[] = [
  {
    title: "Welcome to Fortune's Favor",
    slug: "Welcome",
    ruleType: RuleType.RULE,
    text: [
      {
        text: "Welcome to Fortune's Favor, a tabletop roleplaying game for a fast & fun fantasy adventures whether it's your first or five hundredth roleplaying game.",
        type: "RULE",
      },
    ],
    subRules: [],
    list: [],
  },
  {
    title: "The Basics",
    slug: "TLDR",
    ruleType: RuleType.RULE,
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
    ruleType: RuleType.RULE,
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
        ruleType: RuleType.RULE,
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
        ruleType: RuleType.RULE,
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
        ruleType: RuleType.RULE,
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

export const revalidate = 30;
export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between md:p-24">
      <div className="max-w-2xl" id="">
        {rulesPageText.map((rule) => {
          return <RuleField field={rule} depth={1} key={rule.slug} />;
        })}
      </div>
      <div className="items-top pt-5">
        <table className="border border-slate-500 text-left border-spacing-3">
          <caption>Change Log</caption>
          <thead>
            <tr className="bg-slate-200 dark:bg-slate-700 border border-slate-500">
              <th>Date</th>
              <th>Changes</th>
            </tr>
          </thead>
          <tbody className="">
            <tr className="border-slate-500 border mb-2">
              <td className="border-spacing-x-3 align-baseline">3/16/2024 </td>
              <td>
                <ul>
                  <li>
                    <SlugLinker
                      text={
                        "Added suggested rules reading lists to the home page"
                      }
                    />
                  </li>
                </ul>
              </td>
            </tr>
            <tr className="border-slate-500 border mb-2">
              <td className="border-spacing-x-3 align-baseline">3/24/2024 </td>
              <td>
                <ul>
                  <li>
                    <SlugLinker
                      text={"Added the [shapeshifter](/rules/classes/shifter)."}
                    />
                  </li>
                  <li>
                    <SlugLinker
                      text={
                        "Updated the [Brawler](/rules/classes/brawler) in include dex builds and signiture moves."
                      }
                    />
                  </li>
                </ul>
              </td>
            </tr>
            <tr className="border-slate-500 border mb-2">
              <td className="border-spacing-x-3 align-baseline">3/26/2024 </td>
              <td>
                <ul>
                  <li>
                    <SlugLinker
                      text={
                        "Updated rules to clarify Counter calculation and the benefits of R&R."
                      }
                    />
                  </li>
                </ul>
              </td>
            </tr>
            <tr className="border-slate-500 border mb-2">
              <td className="border-spacing-x-3 align-baseline">9/04/2024</td>
              <td>
                <ul>
                  <li>
                    <SlugLinker
                      text={
                        "Updates to [Resting](/rules/player_rules#REST) to expand Night's Rest. Added healing when you finish a Night's Rest."
                      }
                    />
                  </li>
                  <li>
                    <SlugLinker
                      text={
                        "A full spell check and general cleanup of the rules."
                      }
                    />
                  </li>
                  <li>
                    <SlugLinker
                      text={
                        "Improved mobile layout and reduced the dead space."
                      }
                    />
                  </li>
                </ul>
              </td>
            </tr>
            <tr className="border-slate-500 border mb-2">
              <td className="border-spacing-x-3 align-baseline">9/12/2024</td>
              <td>
                <ul>
                  <li>
                    <SlugLinker
                      text={"Updates [starting rules page](/rules)."}
                    />
                  </li>
                </ul>
              </td>
            </tr>
            <tr className="border-slate-500 border mb-2">
              <td className="border-spacing-x-3 align-baseline">9/21/2024</td>
              <td>
                <ul>
                  <li>
                    <SlugLinker
                      text={
                        "Added the [Spellsword](/rules/classes/SPELLSWORD)."
                      }
                    />
                  </li>
                </ul>
              </td>
            </tr>
            <tr className="border-slate-500 border mb-2">
              <td className="border-spacing-x-3 align-baseline">12/1/2024</td>
              <td>
                <ul>
                  <li>
                    <SlugLinker
                      text={"Added Deflect dice and updated shields."}
                    />
                  </li>
                  <li>
                    <SlugLinker text={"Updated the character sheet."} />
                  </li>
                </ul>
              </td>
            </tr>
            <tr className="border-slate-500 border mb-2">
              <td className="border-spacing-x-3 align-baseline">3/18/2025</td>
              <td>
                <ul>
                  <li>
                    <SlugLinker text={"Added ability to sign up and sign in"} />
                  </li>
                  <li>
                    <SlugLinker text={"profile page"} />
                  </li>
                  <li>
                    <SlugLinker text={"Added digital character sheet"} />
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
