import { Suspense, useState } from "react";
import client from "../utils/graphQLclient";
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
  searchTerm: string;
  result: SearchQueryResult;
};

export const SearchResult = ({ searchTerm, result }: SearchResultProps) => {
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

  const highlightSearchResult = (searchTerm: string, text: string) => {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return (
      <span>
        {" "}
        {parts.map((part, i) => (
          <span
            key={i}
            className={
              part.toLowerCase() === searchTerm.toLowerCase()
                ? "underline decoration-amber-500 text-amber-800 dark:text-amber-300 font-thin"
                : ""
            }
          >
            {part}
          </span>
        ))}{" "}
      </span>
    );
  };
  const partialUrl = result.href.split("#");
  let builtHref = partialUrl[0];
  if (searchTerm) builtHref += `?query=${searchTerm}`;
  if (partialUrl[1]) builtHref += `#${partialUrl[1]}`;
  return (
    <>
      {result.href ? (
        <Link
          href={`${builtHref}`}
          className="hover:tracking-wide hover:text-slate-600 dark:hover:text-slate-300"
        >
          <div className="pb-3">
            <div className={titleStyle}>
              <h1 className="text-lg font-semibold float-left grow">
                {highlightSearchResult(
                  searchTerm,
                  !isSub ? result.title : result.page,
                )}
              </h1>
              <h3 className="float-right">{resultType}</h3>
            </div>
            <div className="clear-both">
              {isSub && (
                <h3 className="px-2 pt-3 text-base font-semibold">
                  {highlightSearchResult(searchTerm, result.title)}
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
                      {highlightSearchResult(searchTerm, t.text)}
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
  searchTerm: string;
  results: any;
};

const SearchResultsTable = ({
  searchTerm,
  results,
}: SearchResultsTableProps) => {
  return (
    <div id="SearchResults" className="border-spacing-3 flex flex-col">
      {results.searchAll.map((result: any) => {
        return (
          <div
            key={result.slug}
            className="bg-slate-200 dark:bg-slate-800 min-h-5 mb-3 hover:scale-105"
          >
            <SearchResult searchTerm={searchTerm} result={result} />
          </div>
        );
      })}
    </div>
  );
};

const SearchResults = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const searchQuery = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const { data, loading, error } = await client.query({
    query,
    variables: { search: searchQuery },
  });
  if (error) console.error("SearchResults", data, loading, error);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="pt-10 px-4">
      <Suspense key={searchQuery + currentPage} fallback={<>Searching...</>}>
        {data.searchAll && data.searchAll.length > 0 ? (
          <SearchResultsTable searchTerm={searchQuery} results={data} />
        ) : (
          <div className="h-[calc(100vh-120px)] grid grid-cols-1 gap-4 place-content-center">
            <div className="text-center">
              <span>Our goblins couldn&apos;t dig up anything for </span>
              <span className="underline decoration-amber-500 text-amber-800 dark:text-amber-300 font-thin">
                {searchQuery}
              </span>
              <span> maybe try searching for something else.</span>
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default SearchResults;
