import Link from "next/link";
import CharacterCulture from "../utils/CharacterCulture";
import Traits from "./Traits";
import { graphQLCulture } from "../utils/graphQLtypes";

type CultureProps = {
  data: graphQLCulture;
  isList?: boolean;
};

const Culture = ({ data, isList = false }: CultureProps) => {
  const c = new CharacterCulture(data);
  return (
    <div id={c.slug} className="mb-6">
      <div className="py-4 px-2 text-2xl tracking-wide bg-blue-300 dark:bg-blue-800 flex flex-row">
        <h1 className="flex-grow">{c.title}</h1>
        {isList && (
          <div className="flex items-center ps-3 z-10 mr-4">
            <Link
              className="cursor-pointer disabled:cursor-not-allowed text-gray-800 dark:text-amber-200 hover:text-amber-400 disabled:text-slate-700"
              href={"/rules/cultures/" + c.slug}
            >
              <svg
                className="w-6 h-6 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>

      <div className="px-3">
        <div className="italic">{c.desc}</div>
        <div>
          <span className="font-semibold">Language: </span>
          {c.lang}
        </div>
        <div>
          <span className="font-semibold">Stat: </span>
          {c.stat}
        </div>
        <Traits title="Traits" traits={c.features} />
        {c.options && <Traits title="Options" traits={c.options} />}
      </div>
    </div>
  );
};

export default Culture;
