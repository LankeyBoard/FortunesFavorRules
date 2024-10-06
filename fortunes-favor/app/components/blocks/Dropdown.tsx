"use client";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function Dropdown() {
  const [isShown, setShown] = useState(false);
  return (
    <div className="relative inline-block text-left">
      {isShown && (
        <div m-4 p-2 rounded-lg bg-purple-900 text-center>
          menu
        </div>
      )}
      <div>
        <button
          onClick={() => setShown((isShown) => !isShown)}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-purple-900 bg- px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Options
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-gray-400"
          />
        </button>
      </div>
    </div>
  );
}
