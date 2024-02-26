import { Suspense, useState } from "react";
import { getClient } from "../utils/graphQLclient";
import { gql } from "@apollo/client";
import SearchBar from "./blocks/SearchBar";
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
    }
  }
`;
type SearchQueryResult = {
  href: string;
  shortTitle?: string;
  slug: string;
  text: RuleText[];
  title: string;
};

type SearchResultProps = {
  result: SearchQueryResult;
};

const SearchResult = ({ result }: SearchResultProps) => {
  return (
    <>
      {result.href ? (
        <Link href={result.href} className="">
          <h1>{result.title}</h1>
          {result.text &&
            result.text.map((t) => {
              return (
                <p key={t.text} className="line-clamp-3">
                  {t.text}
                </p>
              );
            })}
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
    <table id="SearchResults">
      <tbody className="">
        {results.searchAll.map((result: any) => {
          return (
            <tr key={result.slug} className="even:bg-slate-700 max-h-20">
              <SearchResult result={result} />
            </tr>
          );
        })}
      </tbody>
    </table>
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
