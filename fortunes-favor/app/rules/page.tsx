const exampleLink =
  "Example text before the link [Example Link](/rules/player_rules/getting_started/character_resources) and after the link [block] and (emphasis)";

export default function RulesHome() {
  return (
    <main className="">
      <div className="" id="">
        <div>
          <h1 className="text-3xl tracking-wide font-bold py-4 px-2 bg-purple-300 dark:bg-purple-800">
            TLDR
          </h1>
          <p>
            Fortune&apos;s Favor is a d20 based system with success, mixed
            results and failures. At it&apos;s simplest a player wants to do
            something risky, the Game Master (GM) decides how difficult the task
            is and tells the player. They both work together to figure out what
            bonuses apply to the roll. The player rolls and based on the result
            the GM continues to narrate the scene.
          </p>
        </div>
        <div>
          <h1 className="text-3xl tracking-wide font-bold py-4 px-2 bg-purple-300 dark:bg-purple-800">
            What to Read
          </h1>
          <p>
            It isn’t necessary nor intended for you to read the rules cover to
            cover. Here are a few different suggested readings based on how much
            you want to read.
          </p>
          <p>
            <b className="capitalize">Jump right in:</b> Read The Core of the
            Game, What Makes Up a Character to Resting, & Building a New
            Character. Then skim the Lineages, Cultures and Classes and read the
            ones that interest you.
          </p>
          <p>
            <b className="capitalize">A solid understanding: </b>Read everything
            up to Lineages. Then skim the Lineages, Cultures and Classes and
            read the ones that interest you. Then read Combat Rounds to the end
            of the Cover section. Skim the Additional Info section, only reading
            Help & Movement.
          </p>
          <p>
            <b className="capitalize">To Run the Game: </b>Read everything
            suggested in A Solid Understanding, but read the Additional Info
            sections.
          </p>
        </div>
      </div>
    </main>
  );
}
