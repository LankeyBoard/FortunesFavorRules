import SearchResuls from "../components/SearchResults";
import SlugLinker from "../components/blocks/SlugLinker";

const exampleLink =
  "Example text before the link [Example Link](/rules/player_rules/getting_started/character_resources) and after the link [block] and (emphasis)";

export default function RulesHome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <SlugLinker text={exampleLink} />
        <SearchResuls />
      </div>
    </main>
  );
}
