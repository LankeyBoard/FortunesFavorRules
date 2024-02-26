import { Suspense, useState } from "react";
import { getClient } from "../utils/graphQLclient";
import { gql } from "@apollo/client";
import Link from "next/link";
import { RuleText } from "../utils/graphQLtypes";

const query = gql`
  query SearchAll($search: String!) {
    searchAll(phrase: $search) {
      href
      shortTitle
      slug
      text {
        text
        type
      }
      title
      type
      page
    }
  }
`;
type SearchQueryResult = {
  href: string;
  shortTitle?: string;
  slug: string;
  text: RuleText[];
  title: string;
  type: string;
  page: string;
};

type SearchResultProps = {
  result: SearchQueryResult;
};

const SearchResult = ({ result }: SearchResultProps) => {
  let titleStyle = "flex p-2";
  let resultType = "";
  switch (result.type) {
    case "characterClass":
      titleStyle += " bg-teal-300 dark:bg-teal-800";
      resultType = "Class";
      break;
    case "rule":
      titleStyle += " bg-purple-300 dark:bg-purple-800";
      resultType = "Rule";
      break;
    case "culture":
      titleStyle += " bg-blue-300 dark:bg-blue-800";
      resultType = "Culture";
      break;
    case "lineage":
      titleStyle += " bg-sky-300 dark:bg-sky-800";
      resultType = "Lineage";
      break;
    case "noviceFeature":
      titleStyle += " bg-fuchsia-300 dark:bg-fuchsia-900";
      resultType = "Novice Feature";
      break;
    case "veteranFeature":
      titleStyle += " bg-fuchsia-300 dark:bg-fuchsia-900";
      resultType = "Veteran Feature";
      break;
    default:
      titleStyle += " bg-red-500";
  }
  const isSub = result.title !== result.page;
  return (
    <>
      {result.href ? (
        <Link
          href={result.href}
          className="hover:tracking-wide hover:text-slate-300"
        >
          <div className="pb-3">
            <div className={titleStyle}>
              <h1 className="text-lg font-semibold float-left grow">
                {!isSub ? result.title : result.page}
              </h1>
              <h3 className="float-right">{resultType}</h3>
            </div>
            <div className="clear-both">
              {isSub && (
                <h3 className="px-2 pt-3 text-base font-semibold">
                  {result.title}
                </h3>
              )}
              {result.text && result.text.length > 0 ? (
                result.text.map((t) => {
                  return (
                    <p
                      key={t.text}
                      className={
                        isSub
                          ? "line-clamp-3 pl-4 pr-3 pt-3"
                          : "line-clamp-3 px-3 pt-3"
                      }
                    >
                      {t.text}
                    </p>
                  );
                })
              ) : (
                <p className="p-3"> - </p>
              )}
            </div>
          </div>
        </Link>
      ) : (
        <h1 className="bg-red-500">{result.title}</h1>
      )}
    </>
  );
};

type SearchResultsTableProps = {
  results: any;
};

const SearchResultsTable = ({ results }: SearchResultsTableProps) => {
  console.log("results = ", results.searchAll);
  return (
    <div id="SearchResults" className="border-spacing-3 flex flex-col">
      {results.searchAll.map((result: any) => {
        return (
          <div
            key={result.slug}
            className="even:bg-slate-800 odd:bg-slate-950 min-h-5 mb-3 hover:scale-105"
          >
            <SearchResult result={result} />
          </div>
        );
      })}
    </div>
  );
};

const SearchResuls = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const searchQuery = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const client = getClient();
  const { data } = await client.query({
    query,
    variables: { search: searchQuery },
  });
  console.log(data.searchAll);
  return (
    <>
      <Suspense key={searchQuery + currentPage} fallback={<>Searching...</>}>
        {data.searchAll && data.searchAll.length > 0 ? (
          <SearchResultsTable results={data} />
        ) : (
          <div>
            <line>
              Failed to turn anything up for the search: {searchQuery}
            </line>
          </div>
        )}
      </Suspense>
    </>
  );
};

export default SearchResuls;
