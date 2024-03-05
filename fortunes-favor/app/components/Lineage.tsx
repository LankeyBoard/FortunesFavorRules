import Link from "next/link";
import CharacterLineage from "../utils/CharacterLineage";
import { graphQLLineage } from "../utils/graphQLtypes";
import Traits from "./Traits";

type LineageProps = {
  data: graphQLLineage;
  isList?: boolean;
};

const Lineage = ({ data, isList = false }: LineageProps) => {
  const l = new CharacterLineage(data);
  return (
    <div id={l.slug} className="mb-6">
      <div className="py-4 px-2 text-2xl tracking-wide bg-sky-300 dark:bg-sky-800 flex flex-row">
        <h1 className="flex-grow">{l.title}</h1>
        {isList && (
          <div className="flex items-center ps-3 z-10 mr-4">
            <Link
              className="cursor-pointer disabled:cursor-not-allowed text-gray-800 dark:text-amber-200 hover:text-amber-400 disabled:text-slate-700"
              href={"/rules/lineages/" + l.slug}
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
        <div className="italic">{l.desc}</div>
        <div>
          <span className="font-semibold">Size - </span>{" "}
          {typeof l.size === "string" ? (
            <span className="capitalize">{l.size.toLocaleLowerCase()}</span>
          ) : (
            <span className="capitalize">
              {l.size.join(", ").toLocaleLowerCase()}
            </span>
          )}
        </div>
        <div>
          <span className="font-semibold">Speed - </span>
          {l.speed}
        </div>
        <div>
          <span className="font-semibold">Stat - </span>
          {l.stat}
        </div>
        <Traits title="Traits" traits={l.traits} />
      </div>
    </div>
  );
};

export default Lineage;
