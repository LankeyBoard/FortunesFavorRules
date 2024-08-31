"use client";
import { isSmallWindow } from "@/app/utils/isSmallWindow";
import useWindowDimensions from "@/app/utils/useWindowDimensions";
import Link from "next/link";
import { useEffect, useState } from "react";

const NavHeader = () => {
  const { height, width } = useWindowDimensions();
  const [menuVisible, setMenuVisible] = useState(true);
  useEffect(() => {
    if (!isSmallWindow(width)) {
      setMenuVisible(true);
    } else {
      setMenuVisible(false);
    }
  }, [width]);
  const closeMenuIfOpen = () => {
    if (isSmallWindow(width)) {
      setMenuVisible(false);
    }
  };
  return (
    <div
      className="items-center justify-between w-full md:flex md:w-auto order-1"
      id="navbar-links"
    >
      <button
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-links"
        aria-expanded="false"
        onClick={() => {
          setMenuVisible(!menuVisible);
        }}
      >
        <span className="sr-only">Open main menu</span>
        <svg width="24" height="24" fill="none" aria-hidden="true">
          <path
            d="M12 6v.01M12 12v.01M12 18v.01M12 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>
      {menuVisible && (
        <div className="absolute right-0 z-50 md:order-1 md:relative">
          <ul className="flex flex-col p-4 md:p-0 mt-4 mr-8 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-slate-800 md:dark:bg-slate-900 dark:border-slate-700">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-amber-700 dark:text-white rounded md:bg-transparent md:text-amber-700 md:p-0 md:dark:text-amber-400 hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent"
                aria-current="page"
                onClick={() => {
                  closeMenuIfOpen();
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/rules"
                onClick={() => {
                  closeMenuIfOpen();
                }}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-amber-700 md:p-0 md:dark:hover:text-amber-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Rules
              </Link>
            </li>
            <li>
              <a
                href="https://drive.google.com/file/d/1vFeswq_OIrhHdF2WNfe-ErR9bygaBsgt/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  closeMenuIfOpen();
                }}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-amber-700 md:p-0 md:dark:hover:text-amber-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Character Sheet
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavHeader;
