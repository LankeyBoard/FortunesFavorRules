import SlugLinker from "./components/blocks/SlugLinker";

export const revalidate = 30;
export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="max-w-lg">
        <p>
          Welcome to Fortune&apos;s Favor, a tabletop roleplaying game for a
          fast & fun fantasy adventures whether it&apos;s your first or five
          hundredth roleplaying game.
        </p>
        <p className="pt-2">
          <SlugLinker text={"Get started [reading the rules](/rules)"} />
        </p>
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
                <td className="border-spacing-x-3 align-baseline">
                  3/16/2024{" "}
                </td>
                <td>
                  <ul>
                    <li>
                      <SlugLinker
                        text={
                          "Added suggested rules reading lists to the [rules page](/rules)"
                        }
                      />
                    </li>
                  </ul>
                </td>
              </tr>
              <tr className="border-slate-500 border mb-2">
                <td className="border-spacing-x-3 align-baseline">
                  3/24/2024{" "}
                </td>
                <td>
                  <ul>
                    <li>
                      <SlugLinker
                        text={
                          "Added the [shapeshifter](/rules/classes/shifter)."
                        }
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
                <td className="border-spacing-x-3 align-baseline">
                  3/26/2024{" "}
                </td>
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
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
