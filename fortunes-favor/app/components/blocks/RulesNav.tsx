"use client";
import Link from "next/link";
import { nav } from "@/app/rules/layout";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import useWindowDimensions from "@/app/utils/useWindowDimensions";
import { isSmallWindow } from "@/app/utils/isSmallWindow";
import Tooltip from "./Tooltip";

type navProps = {
  navEl: nav;
  isSub?: boolean;
};

export const NavElem = ({ navEl, isSub }: navProps) => {
  const path = usePathname();
  let isCurrent = false;
  if (path === navEl.href) {
    isCurrent = true;
  }
  return (
    <div key={navEl.title} className="">
      {navEl.href && !isCurrent ? (
        <div
          className={
            isSub
              ? "border-l-amber-700 border-l hover:border-l-amber-400 dark:hover:border-l-amber-500"
              : ""
          }
        >
          <Link
            href={navEl.href}
            className="font-light text-lg hover:tracking-wide whitespace-nowrap"
          >
            <div
              className={
                "font-light text-lg text-slate-700 dark:text-slate-200 hover:tracking-wide hover:text-amber-700 dark:hover:text-amber-100 whitespace-nowrap ml-3"
              }
            >
              {navEl.title}
            </div>
          </Link>
        </div>
      ) : (
        <div
          className={isCurrent && isSub ? "border-l-amber-400 border-l" : ""}
        >
          <div
            className={
              isCurrent
                ? "text-amber-600 dark:text-amber-300 text-lg text-ellipsis whitespace-nowrap ml-3"
                : "font-medium text-xl dark:text-white text-ellipsis whitespace-nowrap"
            }
          >
            {navEl.title}
          </div>
        </div>
      )}
      <div className="mx-2">
        {navEl.subroutes?.map((r) => {
          return <NavElem navEl={r} isSub={true} key={r.title} />;
        })}
      </div>
    </div>
  );
};

const NavMenu = ({ navMap }: { navMap: nav[] }) => {
  return (
    <div className="flex-left flex-grow">
      <aside
        id="sidebar-multi-level-sidebar"
        className="z-40 w-64 bg-slate-300 dark:bg-slate-950 p-4 overflow-auto"
        aria-label="Sidebar"
      >
        <div className="flex-col my-5">
          {navMap.map((n) => {
            return <NavElem navEl={n} key={n.title} />;
          })}
        </div>
      </aside>
    </div>
  );
};

const RulesNav = ({ navMap }: { navMap: nav[] }) => {
  const { height, width } = useWindowDimensions();
  const [menuVisible, setMenuVisible] = useState(true);
  const [menuStyle, setMenuStyle] = useState("flex");
  useEffect(() => {
    if (!isSmallWindow(width)) {
      setMenuStyle("flex");
      setMenuVisible(true);
    } else {
      setMenuStyle("fixed flex");
      setMenuVisible(false);
    }
  }, [width]);

  const handleMenuHideButton = () => {
    setMenuVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className={menuStyle}>
      <div className={menuVisible ? "z-50" : "hidden"}>
        <NavMenu navMap={navMap} />
      </div>
      <Tooltip message={menuVisible ? "Hide Menu" : "Show Menu"}>
        <div className={"flex-left z-50 h-fit"}>
          <div
            className={
              menuVisible
                ? "-rotate-90 w-auto h-auto m-2"
                : "rotate-90 w-auto h-auto m-2"
            }
          >
            <button
              aria-controls="sidebar-multi-level-sidebar"
              type="button"
              onClick={handleMenuHideButton}
              className="items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-3 h-3 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </div>
        </div>
      </Tooltip>
    </div>
  );
};

export default RulesNav;
