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
        <div className="items-center pt-5">
          <table className="border border-slate-500 text-left border-spacing-3">
            <caption>Change Log</caption>
            <thead>
              <tr className="bg-slate-700 border border-slate-500">
                <th>Date</th>
                <th>Changes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="border-spacing-x-3">3/16/2024 </td>
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
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
