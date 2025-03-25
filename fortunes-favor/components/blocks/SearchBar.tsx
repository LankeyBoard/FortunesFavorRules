"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const getUrl = () => {
  if (typeof window === "undefined") {
    return;
  }
  return new URL(window.location.toString());
};

const SearchBar = () => {
  const [term, setTerm] = useState<string | null | undefined>(
    getUrl()?.searchParams.get("query"),
  );
  const router = useRouter();

  const handleSearchUpdate = (searchTerm: string) => {
    if (searchTerm) {
      setTerm(searchTerm);
    } else {
      setTerm(undefined);
    }
  };
  const submitSearch = (searchTerm: string) => {
    const url = getUrl();
    if (!url) return;
    console.info("Submit", searchTerm);
    url.searchParams.delete("query");
    url.searchParams.set("query", searchTerm || "");
    url.pathname = "/searchResults";
    router.push(url.toString());
  };

  useEffect(() => {
    const url = getUrl();
    if (!url) return;
    if (term) {
      url.searchParams.set("query", term);
    } else {
      url.searchParams.delete("query");
    }
    router.replace(url.toString(), { scroll: false });
  }, [term]);

  return (
    <>
      <div className="relative block max-w-3xl">
        <input
          type="text"
          id="search-navbar"
          className="block w-full p-2 ps-10 text-sm text-gray-900 border border-slate-300 rounded-lg bg-gray-50 dark:bg-slate-950 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Search..."
          defaultValue={term || undefined}
          onChange={(e) => {
            handleSearchUpdate(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              submitSearch(term || "");
            }
          }}
        />

        <div className="absolute inset-y-0 end-3 flex items-center ps-3">
          <button
            disabled={!term}
            className="cursor-pointer disabled:cursor-not-allowed text-amber-800 hover:text-amber-500 dark:text-amber-200 disabled:text-slate-500"
            onClick={() => {
              if (term) submitSearch(term);
              else console.error("Cannot search for [" + term + "]");
            }}
          >
            <div className="">
              <svg
                className="w-4 h-4"
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
            {/* <svg
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
            </svg> */}
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
