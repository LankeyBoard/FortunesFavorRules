import { Suspense, useState } from "react";
import { getClient } from "../utils/graphQLclient";
import { gql } from "@apollo/client";
import SearchBar from "./blocks/SearchBar";
import Link from "next/link";

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

type SearchResultsTableProps = {
  results: any;
};

const SearchResultsTable = ({ results }: SearchResultsTableProps) => {
  console.log("results = ", results.searchAll);
  return (
    <>
      <div>
        {results.searchAll.map((result: any) => {
          return (
            <div key={result.slug}>
              <Link href={result.href}>{result.title}</Link>
            </div>
          );
        })}
      </div>
    </>
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
      <div>
        <SearchBar />
      </div>
      <Suspense key={searchQuery + currentPage} fallback={<>Searching...</>}>
        {data.searchAll && data.searchAll.length > 0 && (
          <SearchResultsTable results={data} />
        )}
      </Suspense>
    </>
  );
};

export default SearchResuls;
