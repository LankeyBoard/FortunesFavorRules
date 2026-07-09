import Button, { ButtonType } from "@/components/blocks/Inputs/Button";
import RuleField from "../components/RuleField";
import { RuleType } from "../utils/enums";
import { GenericRule } from "../utils/graphQLtypes";
import Link from "next/dist/client/link";

const rulesPageText: GenericRule[] = [
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
    lists: [],
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
        lists: [],
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
        lists: [],
      },
      {
        title: "Running a Game",
        slug: "RUNNING",
        ruleType: RuleType.RULE,
        text: [
          {
            text: "It would be best to read all the [player rules](/rules/player_rules) and at least skim the [GM Rules](/rules/gm_rules) before running a game.",
            type: "RULE",
          },
        ],
        subRules: [],
        lists: [],
      },
    ],
    lists: [],
  },
  {
    title: "Additional Features",
    slug: "ADDITIONAL-FEATURES",
    ruleType: RuleType.RULE,
    text: [
      {
        text: "In addition to the core rules, this website includes [GM rules](/rules/gm_rules), [monster stats](/monsters), a digital character sheet, campaign, shops and encounters.",
        type: "RULE",
      },
    ],
    subRules: [],
    lists: [],
  },
];

export const revalidate = 30;
export default async function Home() {
  return (
    <main className="relative flex flex-col items-center justify-between">
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://uploads6.wikiart.org/images/harry-clarke/tales-of-mystery-and-imagination-by-edgar-allan-poe-1923-23.jpg")',
        }}
      />
      <div className="flex flex-col min-h-[80vh] w-full lg:max-w-6xl items-center justify-center">
        <div className="bg-white/70 dark:bg-black/70 px-6 py-8 mb-6 md:mb-8 backdrop-blur-sm md:rounded">
          <h1 className="font-black-chancery md:text-8xl text-center m-6  text-6xl">
            Fortune's Favor
          </h1>
        </div>
        <div className="bg-white/70 dark:bg-black/70 px-6 py-8 backdrop-blur-sm md:rounded">
          {/* <h1 className="font-black-chancery text-9xl text-center mt-6 mb-12  sm:text-6xl">
            Fortune's Favor
          </h1> */}
          <p className="mt-6 text-lg leading-8 text-center">
            Welcome to Fortune's Favor, a tabletop roleplaying game for fast &
            fun fantasy adventures whether it's your first or five hundredth
            roleplaying game.
          </p>
          <p className="mt-6 text-lg leading-8 text-left">
            &nbsp;&nbsp; Fortune's Favor is a d20 based system, where failure is
            fun, characters are unique, and the GM has the tools to improvise
            and create a story with the players. The rules are designed to be
            easy to learn, but deep enough to allow for a wide variety of play
            styles and character concepts. The game is designed to be played
            completely offline, offline but with laptops, or online.
          </p>
          <div className="grid grid-cols-2 max-w-max mx-auto gap-4">
            <Button
              buttonType={ButtonType.default}
              color="amber"
              className="mt-6 mx-auto block"
            >
              <Link href="/rules">Read the Rules</Link>
            </Button>
            <div className="block">
              <Button
                buttonType={ButtonType.default}
                color="teal"
                className="mt-6 mx-auto block"
              >
                <Link href="/characters/create_character">
                  Create a Character
                </Link>
              </Button>
            </div>
          </div>
          <p className="mt-6 text-lg font-light italic leading-8 text-center">
            All of the rules are and will always be available for free on this
            site and will be available for download in PDF and MD formats soon.
          </p>
        </div>
      </div>
      <div className="max-w-2xl z-10 " id="">
        {rulesPageText.map((rule) => {
          return (
            <RuleField
              field={rule}
              depth={1}
              key={rule.slug}
              showCopyLink={false}
              className="bg-white/70 dark:bg-black/70 backdrop-blur-sm my-4"
            />
          );
        })}
      </div>
    </main>
  );
}
