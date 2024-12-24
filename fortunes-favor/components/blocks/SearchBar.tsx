"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchBar = () => {
  const [term, setTerm] = useState<string>();
  const router = useRouter();

  const handleSearch = (searchTerm: string) => {
    const url = getUrl();
    if(!url) return;
    if (searchTerm) {
      url.searchParams.set("query", searchTerm);
      setTerm(searchTerm);
    } else {
      url.searchParams.delete("query");
      setTerm(undefined);
    }
    router.replace(url.toString());
  };
  const submitSearch = (query: string) => {
    const url = getUrl();
    if(!url) return;
    console.info("Submit", query, url.searchParams);
    url.searchParams.delete("query")
    url.searchParams.set("query", query);
    url.pathname = '/searchResults'
    console.log(url)
    router.push(url.toString());
  };

  const getUrl = () => {
    if(!window)
      return;
    return new URL(window.location.toString());
  }

  useEffect(()=>{
    const url = getUrl();
    if(url)
      setTerm(url.searchParams.get("query")?.toString())
  })

  return (
    <>
      <div className="relative block max-w-3xl">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search icon</span>
        </div>

        <input
          type="text"
          id="search-navbar"
          className="block w-full p-2 ps-10 text-sm text-gray-900 border border-slate-300 rounded-lg bg-gray-50 dark:bg-slate-950 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Search..."
          defaultValue={term}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              submitSearch(e.currentTarget.value);
            }
          }}
        />

        <div className="absolute inset-y-0 end-3 flex items-center ps-3">
          <button
            className="cursor-pointer disabled:cursor-not-allowed text-gray-800 dark:text-amber-200 hover:text-amber-300 disabled:text-slate-700"
            disabled={!term}
            onClick={() => {
              if (term) submitSearch(term);
              else console.error("Cannot search for [" + term + "]");
            }}
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
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
