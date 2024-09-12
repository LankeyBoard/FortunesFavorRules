"use client";
import Link from "next/link";
import { nav } from "@/app/rules/layout";
import { usePathname } from "next/navigation";
import { MouseEventHandler, useEffect, useState } from "react";

import useWindowDimensions from "@/app/utils/useWindowDimensions";
import { isSmallWindow } from "@/app/utils/isSmallWindow";
import Tooltip from "./Tooltip";

type navProps = {
  navEl: nav;
  isSub?: boolean;
  closeMenuIfOpen: () => void;
};

export const NavElem = ({ navEl, isSub, closeMenuIfOpen }: navProps) => {
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
            className=""
            onClick={() => {
              closeMenuIfOpen();
            }}
          >
            <div
              className={
                "font-light text-lg text-slate-800 dark:text-slate-200 hover:text-amber-700 dark:hover:text-amber-100 ml-3 mr-3 text-balance hover:font-normal hover:mr-0"
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
          return (
            <NavElem
              navEl={r}
              isSub={true}
              key={r.title}
              closeMenuIfOpen={closeMenuIfOpen}
            />
          );
        })}
      </div>
    </div>
  );
};

const NavMenu = ({ navMap }: { navMap: nav[] }) => {
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
    <div className="flex-left flex-grow overflow-auto md:h-[calc(100vh-72px)] h-auto w-screen md:w-auto backdrop-blur-sm md:backdrop-blur-none bg-black/30 border-b-2 border-b-teal-400/50 md:bg-transparent">
      <button
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm backdrop-blur-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100/70 focus:outline-none focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700/70 dark:focus:ring-gray-600"
        aria-controls="navbar-links"
        aria-expanded="false"
        onClick={() => {
          setMenuVisible(!menuVisible);
        }}
      >
        <span className="sr-only">Open main menu</span>
        <svg width="24" height="24">
          <path
            d="M5 6h14M5 12h14M5 18h14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          ></path>
        </svg>
      </button>
      {menuVisible && (
        <aside
          id="sidebar-multi-level-sidebar"
          className="z-40 w-64 bg-slate-200 dark:bg-slate-950 p-4 md:h-full sticky overflow-y-auto h-[calc(100vh-120px)]"
          aria-label="Sidebar"
        >
          <div className="flex-col my-5">
            {navMap.map((n) => {
              return (
                <NavElem
                  navEl={n}
                  key={n.title}
                  closeMenuIfOpen={closeMenuIfOpen}
                />
              );
            })}
          </div>
        </aside>
      )}
    </div>
  );
};

const RulesNav = ({ navMap }: { navMap: nav[] }) => {
  const { height, width } = useWindowDimensions();
  const [menuStyle, setMenuStyle] = useState("flex");
  useEffect(() => {
    if (!isSmallWindow(width)) {
      setMenuStyle("flex h-screen");
    } else {
      setMenuStyle("fixed flex items-start");
    }
  }, [width]);

  return (
    <div className={menuStyle}>
      <NavMenu navMap={navMap} />
    </div>
  );
};

export default RulesNav;
