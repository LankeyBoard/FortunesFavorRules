"use client";
import { isSmallWindow } from "@/utils/isSmallWindow";
import useWindowDimensions from "@/utils/useWindowDimensions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinkBaseClasses =
  "block font-extralight py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-amber-700 md:p-0 md:dark:hover:text-amber-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";

const NavHeader = () => {
  const { height, width } = useWindowDimensions();
  const pathname = usePathname();
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

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
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
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      {menuVisible && (
        <div className="absolute right-0 z-50 md:order-1 md:relative">
          <ul className="flex flex-col p-4 md:p-0 mt-4 mr-4 lg:mr-8 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-4 lg:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-slate-800 md:dark:bg-slate-900 dark:border-slate-700">
            <li>
              <Link
                href="/"
                className={`font-black-chancery text-xl block py-2 px-3 rounded md:bg-transparent md:p-0 hover:text-amber-500 ${isActiveLink("/") ? "border-b-1 border-amber-500 rounded-none" : ""}`}
                aria-current={isActiveLink("/") ? "page" : undefined}
                onClick={() => {
                  closeMenuIfOpen();
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/rules/player_rules"
                onClick={() => {
                  closeMenuIfOpen();
                }}
                className={`${navLinkBaseClasses} ${isActiveLink("/rules") ? "border-b-1 border-amber-500  rounded-none" : ""}`}
                aria-current={isActiveLink("/rules") ? "page" : undefined}
              >
                Rules
              </Link>
            </li>
            <li>
              <Link
                href="/monsters"
                onClick={() => {
                  closeMenuIfOpen();
                }}
                className={`${navLinkBaseClasses} ${isActiveLink("/monsters") ? "border-b-1 border-amber-500  rounded-none" : ""}`}
                aria-current={isActiveLink("/monsters") ? "page" : undefined}
              >
                Monsters
              </Link>
            </li>
            <li>
              <Link
                href="/downloads"
                onClick={() => {
                  closeMenuIfOpen();
                }}
                className={`${navLinkBaseClasses} ${isActiveLink("/downloads") ? "border-b-1 border-amber-500  rounded-none" : ""}`}
                aria-current={isActiveLink("/downloads") ? "page" : undefined}
              >
                Downloads
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavHeader;
